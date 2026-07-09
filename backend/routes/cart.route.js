import express from 'express';
import { addToCart, removeAllFromCart, updateQuantity } from '../controllers/cart.controller.js';


const router = express.Router();

router.post("/", protectRoute, addToCart);
router.get("/", protectRoute, getCartProducts);
router.delete("/", protectRoute, removeAllFromCart);
router.put("/", protectRoute, updateQuantity);


export default router;
