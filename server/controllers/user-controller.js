import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Chat from '../models/chat.js';

const genarateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.find({ email });
        if (existingUser.length > 0) {
            return res
                .status(400)
                .json({ message: 'User already exists', success: false });
        }

        const user = await User.create({ name, email, password });
        const token = genarateToken(user._id);
        user.password = undefined;
        res.json({ token, user, success: true });
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: error.message, success: false });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ message: 'Invalid credentials' });
        }

        const token = genarateToken(user._id);
        user.password = undefined;
        return res
            .status(200)
            .json({ message: 'Login successful', user, token, success: true });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: error.message, success: false });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({ user, success: true });
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: error.message, success: false });
    }
};

export const getPublishedImages = async (req, res) => {
    try {


        const publishedImages = await Chat.aggregate([
            { $unwind: '$messages' },
            { $match: { 'messages.isImage': true, 'messages.isPublished': true } },
            {
                $project: {
                    _id: 0,
                    imageUrl: '$messages.content',
                    userName: '$userName',
                },
            },

        ]);
        res.status(200).json({ images: publishedImages.reverse(), success: true });
    } catch (error) {
        console.error('Error fetching published images:', error);
        return res.status(500).json({ message: error.message, success: false });
    }
};
