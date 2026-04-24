import Stripe from 'stripe';
import User from '../models/user.js';
import Transaction from '../models/transaction.js';
export const stripeWebhook = async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    try {
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                const sessionList = await stripe.checkout.sessions.list({
                    payment_intent: paymentIntent.id,
                });
                const session = sessionList.data[0];
                const { transactionId, appId } = session.metadata;
                if (appId === "quickgpt") {
                    const transaction = await Transaction.findOne({ _id: transactionId, ispaid: false });

                    await User.updateOne({ _id: transaction.userId }, { $inc: { credits: transaction.credits } });
                    if (transaction) {
                        transaction.ispaid = true;
                        await transaction.save();
                    }
                } else {
                    return res.status(400).json({
                        received: false,
                        message: "Ignore event :Invalid app"
                    });
                }
                break;

            default:
                console.warn(`Unhandled event type: ${event.type}`);
                break;
        }

        res.json({ received: true });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};
