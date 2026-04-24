import Chat from '../models/chat.js';

export const createChat = async (req, res) => {
    try {
        const chatData = {
            userId: req.user._id,
            userName: req.user.name,
            name: `New Chat`,
            messages: [],
        };
        const chat = await Chat.create(chatData);
        return res
            .status(201)
            .json({ chat, success: true, message: 'Chat created' });
    } catch (error) {
        console.error('Error creating chat:', error);
        return res.status(500).json({ message: error.message, success: false });
    }
};

export const getChats = async (req, res) => {
    try {
        const user = req.user;
        const chats = await Chat.find({ userId: user._id }).sort({ updatedAt: -1 });
        return res.status(200).json({ chats, success: true });
    } catch (error) {
        console.error('Error fetching chats:', error);
        return res.status(500).json({ message: error.message, success: false });
    }
};

export const getChatById = async (req, res) => {
    try {
        const user = req.user;
        const chatId = req.params.id;
        const chat = await Chat.findOne({ _id: chatId, userId: user._id });
        if (!chat) {
            return res
                .status(404)
                .json({ message: 'Chat not found', success: false });
        }
        return res.status(200).json({ chat, success: true });
    } catch (error) {
        console.error('Error fetching chat by ID:', error);
        return res.status(500).json({ message: error.message, success: false });
    }
};

export const deleteChat = async (req, res) => {
    try {
        const user = req.user;
        const { chatId } = req.body;
        const chat = await Chat.findOneAndDelete({ _id: chatId, userId: user._id });
        if (!chat) {
            return res
                .status(404)
                .json({ message: 'Chat not found', success: false });
        }
        return res.status(200).json({ message: 'Chat deleted', success: true });
    } catch (error) {
        console.error('Error deleting chat:', error);
        return res.status(500).json({ message: error.message, success: false });
    }
};
