import axios from 'axios';
import openai from '../configs/openai.js';
import Chat from '../models/chat.js';
import User from '../models/user.js';
import { imagekit } from '../configs/imagekit.js';

export const textMessageController = async (req, res) => {
    try {
        if (req.user.credits < 1) {
            return res.json({
                message: 'Not enough credits to use this feature',
                success: false,
            });
        }
        const { chatId, prompt } = req.body;
        console.log('Received text message request:', { chatId, prompt, userId: req.user._id });
        const chat = await Chat.findOne({ _id: chatId, userId: req.user._id });
        if (!chat) {
            return res
                .status(404)
                .json({ message: 'Chat not found', success: false });
        }

        chat.messages.push({
            role: 'user',
            content: prompt,
            timestamp: Date.now(),
            isImage: false,
        });
        let choices;
        for (let attempt = 0; attempt < 3; attempt++) {
            try {
                ({ choices } = await openai.chat.completions.create({
                    model: 'llama-3.1-8b-instant',
                    messages: [{ role: 'user', content: prompt }],
                }));
                break;
            } catch (err) {
                if (err.status === 429 && attempt < 2) {
                    await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
                } else {
                    throw err;
                }
            }
        }
        const reply = {
            ...choices[0].message,
            timestamp: Date.now(),
            isImage: false,
        };

        res
            .status(200)
            .json({ message: 'Message processed', reply, success: true });

        chat.messages.push(reply);
        await chat.save();
        await User.updateOne({ _id: req.user._id }, { $inc: { credits: -1 } });
    } catch (error) {
        console.error('Error in textMessageController:', error);
        return res.status(500).json({ message: error.message, success: false });
    }
};

export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id;

        if (req.user.credits < 2) {
            return res.json({
                message: 'Not enough credits to use this feature',
                success: false,
            });
        }

        const { chatId, prompt, isPublished } = req.body;
        const chat = await Chat.findOne({ _id: chatId, userId });
        if (!chat) {
            return res
                .status(404)
                .json({ message: 'Chat not found', success: false });
        }

        chat.messages.push({
            role: 'user',
            content: prompt,
            timestamp: Date.now(),
            isImage: false,
            isPublished: isPublished || false,
        });

        const encodedPrompt = encodeURIComponent(prompt);
        const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT
            }/ik-genimg-prompt-${encodedPrompt}/gpt/${Date.now()}.png?tr=w-800,h-800`;

        const aiImageResponse = await axios.get(generatedImageUrl, {
            responseType: 'arraybuffer',
        });

        const base64Image = `data:image/png;base64,${Buffer.from(
            aiImageResponse.data,
            'binary'
        ).toString('base64')}`;

        //upload image to imagekit
        const uploadResponse = await imagekit.upload({
            file: base64Image,
            fileName: `${Date.now()}.png`,
            folder: 'gpt',
        });

        const reply = {
            role: 'assistant',
            content: uploadResponse.url,
            timestamp: Date.now(),
            isImage: true,
            isPublished: isPublished || false,
        };

        res.status(200).json({ message: 'Image generated', reply, success: true });

        chat.messages.push(reply);
        await chat.save();
        await User.updateOne({ _id: userId }, { $inc: { credits: -2 } });
    } catch (error) {
        console.error('Error in imageMessageController:', error);
        return res.status(500).json({ message: error.message, success: false });
    }
};

