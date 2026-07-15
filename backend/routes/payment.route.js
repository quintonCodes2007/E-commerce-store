import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js'
import { createCheckoutSession } from '../controllers/payment.controller.js';
<<<<<<< HEAD

=======
import coupon from '../models/coupon.model.js';
import { stripe } from '../lib/stripe.js';
>>>>>>> 3642074963ed1fbe2f99a94da2624d202b6d899b

const router = express.Router();


<<<<<<< HEAD
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
=======
router.post("/create-checkout-session", protectRoute, async (req, res) => {
    try {
        const { products, couponCode } = req.body;

        if (!Array.isArray(products)|| products.length === 0) {
            return res.status(400).json({ error: "Invalid or Empty products array" });
        }

        let totalAmount = 0;

        const lineItems = products.map(product=>  {
            const amount = Math.round(product.price * 100);// strip wants format of cents
            totalAmount += amount * product.quantity

            return{
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.name,
                        images: [product.image],
                    },
                    unit_amount: amount
                },
            }
            
        });

        let coupon = null;
        if (couponCode) {
            coupon = await coupon.findOne({code:couponCode, userId:req.user._id, isActive:true});
            if (coupon){
                totalAmount -= Math.round(totalAmount * coupon.discountPrecentage / 100);
            }                 
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
            discounts: coupon
                ? [
                    {
                        coupon: await coupon.getStripeCoupon(coupon.discountPrecentage),
                        
                    },
                  ]
                : [],
        })

>>>>>>> 3642074963ed1fbe2f99a94da2624d202b6d899b
    } catch (error) {
        
    }
});

<<<<<<< HEAD
=======
async function createStripeCoupon( discountPrecentage) {
    const coupon = await stripe.coupons.create({
        percent_off: discountPrecentage,
        duration: "once"
        
      });

      return coupon.id;
}



>>>>>>> 3642074963ed1fbe2f99a94da2624d202b6d899b


export default router;

