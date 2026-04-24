import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    try {
        if (!token) {
            return res
                .status(401)
                .json({ message: 'No token, authorization denied', success: false });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.json({
                message: 'Not Authorized, User not found',
                success: false,
            });
            next();
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Error in auth middleware:', error);
        return res
            .status(401)
            .json({ message: 'Token is not valid', success: false });
    }
};
