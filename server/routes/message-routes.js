import express from 'express';
import {
    textMessageController,
    imageMessageController,
} from '../controllers/message-controller.js';
import { protect } from '../middlewares/auth.js';
const messageRouter = express.Router();

messageRouter.post('/text', protect, textMessageController);
messageRouter.post('/image', protect, imageMessageController);

export default messageRouter;
