import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js'
import { createCheckoutSession } from '../controllers/payment.controller.js';


const router = express.Router();


router.post("/create-checkout-session", protectRoute,createCheckoutSession);
router.post("/checkout-success", protectRoute, async (req, res) => {
    try {
        const {sessionId} = req.body;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if(session.payment_status === "paid"){
            if(session.metadata.couponCode){
                await coupon.findOneAndUpdate({
                    code:session.metadata.couponCode, userId:session.metadata.userId
                }, {
                    isActive:false
                });
            }

            //create a new order
            const products = Json.parse(session.metadata.products);
        }
    } catch (error) {
        
    }
});



export default router;

