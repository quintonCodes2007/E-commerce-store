import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js'
import { createCheckoutSession } from '../controllers/payment.controller.js';
import { stripe } from '../lib/stripe.js';

const router = express.Router();

router.post("/create-checkout-session", protectRoute, createCheckoutSession);
router.post("/checkout-success", protectRoute, async (req,res) => {
    try {
        const {sessionId} = req.body;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if(session.payment_status === 'paid'){ 
            if(session.metadata.couponCode){
                await Coupon.findOneAndUpdate({
                    code:session.metadata.couponCode, 
                    userId:session.metadata
                }, {
                    isActive:false
                });
            }

            //create new order
            const products = JSON.parse(session.metadata.products);
            const newOrder = new Order({
                userId: session.metadata.userId,
                products: products.map(product => ({
                    product: product.id,
                    quantity: product.quantity,
                    price: product.price
                })),
                totalAMount: session.total_amount / 100,
                stripeSessionId: sessionId
            })

            await newOrder.save();
            res.status(200).json({
                success:true,
                message: "Payment successful, order created, and coupon deactivated if used.",
                orderId: newOrder._id
            });
        }
    } catch (error) {  
        console.error("Error in checkout success", error);
        res.status(500).json({message: "Error in checkout success", error: error.message});
    }
});

export default router;

