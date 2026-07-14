import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js'
import { createCheckoutSession } from '../controllers/payment.controller.js';

const router = express.Router();


router.post("/create-checkout-session", protectRoute, async (req, res) => {
    try {
        const { products, couponCode } = req.body;

        if (!Array.isArray(products)|| products.length === 0) {
            return res.status(400).json({ error: "Invalid or products array" });
        }

        let totalAmount = 0;

        const lineItems = products.map(product=>  {
            const amount = Math.round(product.price * 100);// strip wants format of cents
            
        })

    } catch (error) {
        
    }
});



export default router;

