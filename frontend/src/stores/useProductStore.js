import {create } from 'zustand';
import toast from 'react-hot-toast';
import axios from '../lib/axios';


export const useProductStore = create((set) => ({
    products: [],
    loading: false,

    setProducts: (products) => set({ products }),

    createProduct: async (productData) => {
        set({ loading: true });
        try {
            const res = await axios.post('/products', productData);
            set((prevState) => ({
                products: [...prevState.products, res.data],
                loading: false,
            }));
            toast.success('Product created successfully');
        }
        catch (error) {
            toast.error(error.response?.data?.error);
            set({ loading: false });
        }
    },

    fetchAllProducts: async () => {
        set({ loading: true });
        try {
            const res = await axios.get('/products');
            set({ products: res.data.products, loading: false });
        }
        catch (error) {
            set({ error: "Failed to fetch products", loading: false });
            toast.error(error.response?.data?.error || 'Something went wrong');
        }
    },

    deleteProduct: async (productId) => {
        set({ loading: true });
        try {
            await axios.delete(`/products/${productId}`);
            set((prevProducts) => ({
                products: prevProducts.products.filter((product) => product._id !== productId),
                loading: false,
            }));
            toast.success('Product deleted successfully');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Something went wrong');
            set({ loading: false });
        }
    },

    toggleFeaturedProduct: async (productId) => {
        set({ loading: true });
        try {
            const res = await axios.patch(`/products/${productId}`);
            //setting product featured status in the store and updating the product in the state
            set((prevProducts) => ({
                products: prevProducts.products.map((product) =>
                    product._id === productId ? { ...product, isFeatured: !product.isFeatured } : product
                ),
                loading: false,
            }));

        } catch (error) {
            set({ loading: false });
            toast.error(error.response?.data?.error || 'Something went wrong');
        }

    },
}));

