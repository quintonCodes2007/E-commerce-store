import Product from '../models/product.model.js'

export const getCartProducts = async (req, res) => {
    try {
        const products = await Product.find({_id:{$in:req.user.cartItems}});
        
        const cartItems = products.map((product) => {
            const item = req.user.cartItems.find(cartItem => cartItem.id === product._id);
            return {...product.json(), quantity: item.quantity};
        });

        res.json(cartItems);
    } catch (error) {
        console.error("Error in getCartProducts controller:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const user = req.user; // Assuming user is attached to the request object after authentication

        // Check if the product already exists in the user's cart
        const existingItem = user.cartItems.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1; // Update the quantity if it exists
        } else {
            user.cartItems.push(productId); 
        }

        await user.save(); // Save the updated user document
        res.json(user.cartItems); 

    } catch (error) {
        console.error("Error in addToCart controller:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const removeAllFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user; 
        if (!productId) {
            user.cartItems = [];   
        } else {
            user.cartItems = user.cartItems.filter((item) => item.id !== productId);
        }
        await user.save();
        res.json(user.cartItems);
    } catch (error) {
        console.error("Error in removeAllFromCart controller:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updateQuantity = async (req, res) => {
    try {
        const {id:productId} = req.body;
        const { quantity } = req.body;
        const user = req.user; 
        const existingItem = user.cartItems.find((item) => item.id === productId);
        if (existingItem) {
            if (quantity === 0) {
                user.cartItems = user.cartItems.filter((item) => item.id !== productId);
                await user.save();
                return res.json(user.cartItems);
            } 

            existingItem.quantity = quantity;
            await user.save();
            res.json(user.cartItems);
        } else{
            res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        console.log("Error in updateQuantity controller", error.message);
        res.status(500).json({message: "Server error", error: error.message});
    }
};

