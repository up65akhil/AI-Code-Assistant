import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import userRouter from './routes/user-routes.js';
import chatRouter from './routes/chat-routes.js';
import messageRouter from './routes/message-routes.js';
import creditRouter from './routes/credit-routes.js';
import { stripeWebhook } from './controllers/webhook.js';

const app = express();
await connectDB();
//Stripe Webhook
app.post('/api/stripe', express.raw({ type: 'application/json' }), stripeWebhook);

//middlewares
app.use(cors());
app.use(express.json());

//Routes

app.get('/', (req, res) => {
    return res.send('Server is live');
});

app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);
app.use('/api/credit', creditRouter);

const PORT = process.env.PORT || 6173;

app.listen(PORT, () => {
    console.log('App is listening at port', PORT);
});
