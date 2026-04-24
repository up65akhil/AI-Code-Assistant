import Transaction from "../models/transaction.js";
import Stripe from "stripe";
const plans = [
    {
        _id: "basic",
        name: "Basic",
        price: 10,
        credits: 100,
        features: ['100 text generations', '50 image generations', 'Standard support', 'Access to basic models']
    },
    {
        _id: "pro",
        name: "Pro",
        price: 20,
        credits: 500,
        features: ['500 text generations', '200 image generations', 'Priority support', 'Access to pro models', 'Faster response time']
    },
    {
        _id: "premium",
        name: "Premium",
        price: 30,
        credits: 1000,
        features: ['1000 text generations', '500 image generations', '24/7 VIP support', 'Access to premium models', 'Dedicated account manager']
    }
];

export const getPlans = (req, res) => {
    try {
        res.status(200).json({ plans, success: true });
    } catch (error) {
        console.error('Error fetching plans:', error);
        return res.status(500).json({ message: error.message, success: false });
    }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const purchasePlan = async (req, res) => {
    try {
        const { planId } = req.body;
        const plan = plans.find(p => p._id === planId);
        if (!plan) {
            return res.status(400).json({ message: 'Invalid plan ID', success: false });
        }

        //CREATE A TRANSACTION RECORD
        const transaction = await Transaction.create({
            userId: req.user._id,
            planId: plan._id,
            amount: plan.price,
            ispaid: false,
            credits: plan.credits,
        });
        const { origin } = req.headers;
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        unit_amount: plan.price * 100,
                        product_data: {
                            name: plan.name,
                        },
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${origin}/loading`,
            cancel_url: `${origin}`,
            metadata: { transactionId: transaction._id.toString(), appId: "quickgpt" },
            expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes from now
        });

        return res.status(200).json({ url: session.url, success: true });
    } catch (error) {
        console.error('Error purchasing plan:', error);
        return res.status(500).json({ message: error.message, success: false });
    }
}