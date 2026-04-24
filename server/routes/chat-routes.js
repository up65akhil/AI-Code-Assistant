import express from 'express';
import {
    createChat,
    getChats,
    getChatById,
    deleteChat,
} from '../controllers/chat-controller.js';
import { protect } from '../middlewares/auth.js';

const chatRouter = express.Router();

chatRouter.get('/create', protect, createChat);
chatRouter.get('/getchats', protect, getChats);
chatRouter.get('/getchat/:id', protect, getChatById);
chatRouter.delete('/deletechat', protect, deleteChat);

export default chatRouter;
