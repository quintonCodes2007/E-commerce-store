import {create} from 'zustand';
import axios from '../lib/axios';
import {toast} from 'react-hot-toast'; 


export const useCartStore = create((set, get) => ({
  cartItems: [],
  coupon: null,
  total: 0,
  subTotal: 0,

    getCartItems: async () => {
        try {
            const response = await axios.get('/cart');
            set({cartItems: response.data});
            get().calculateTotal();
        } catch (error) {
            toast.error(error.response.data.message || 'Error fetching cart items');
        }
    },


  addToCart: async (product) => {
    try {
      await axios.post('/cart', { productId: product._id });
        toast.success('Item added to cart');
        set((prevState) => {
            const existingItem = prevState.cartItems.find(item => item._id === product._id);
            const newCartItems = existingItem
                ? prevState.cartItems.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item)
                : [...prevState.cartItems, { ...product, quantity: 1 }];
            return { cartItems: newCartItems };
        });
        get().calculateTotal();
    } catch (error) {
      toast.error(error.response.data.message || 'Error adding item to cart');
    }
  },

  calculateTotal: () => {
    const { cartItems, coupon } = get();
    const subTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let total = subTotal;
    if (coupon) {
      const discountAmount = (subTotal * coupon.discount) / 100;
      total = subTotal - discountAmount;
    }
    set({ subTotal, total });
  },

  applyCoupon: (coupon) => {
    const { cartItems } = get();
    const subTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subTotal + coupon?.amount || 0;
    set({ subTotal, total });
  },


removeFromCart: async (productId) => {
    try {
        const response = await axios.delete('/cart', {
            data: { productId }
        });

        if (response.status === 200) {
            toast.success('Item removed from cart');
            set(prevState => ({
                cartItems: prevState.cartItems.filter(item => item._id !== productId)
            }));
            get().calculateTotal();
        }
    } catch (error) {
        console.error("Error removing item from cart:", error);
        toast.error(error.response?.data?.message || 'Error removing item from cart');
    }
},

updateQuantity: async (productId, quantity) => {
  if (quantity === 0) {
    await get().removeFromCart(productId);
    return
  } else {
    try {
      const response = await axios.put('/cart', { productId, quantity });
      set(prevState => ({
        cartItems: prevState.cartItems.map(item => item._id === productId ? { ...item, quantity } : item)
      }));
      get().calculateTotal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating item quantity');
    }
  }
},

  clearCart: async () => {
    try {
      const response = await axios.post('/api/cart/clear');
      if (response.status === 200) {
        toast.success('Cart cleared');
        set({cartItems: response.data.cartItems});
      } else {
        toast.error('Error clearing cart');
      }
    } catch (error) {
      toast.error('Error clearing cart');
    }
  },
}));