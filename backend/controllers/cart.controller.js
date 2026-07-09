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

