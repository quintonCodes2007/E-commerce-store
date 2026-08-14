import React from 'react'
import { PlusCircle, ShoppingBasket, BarChart } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

import CreateProductForm from '../components/CreateProductsForm';
import ProductsList from '../components/ProductsList';
import AnalyticsTab from '../components/AnalyticsTab';
import { useProductStore } from '../stores/useProductStore';


const tabs = [
    {id: "products", label: "Products", icon: ShoppingBasket},
    {id: "create", label: "Create Product", icon: PlusCircle},
    {id: "analytics", label: "Analytics", icon: BarChart},
];

const AdminPage = () => {

    const [activeTab, setActiveTab] = useState("products");
    const { fetchAllProducts } = useProductStore();

    useEffect(() => {
        fetchAllProducts();
    }, [fetchAllProducts]);

    return (
        <div className='min-h-screen  text-white relative overflow-hidden'>
            <div className='relative z-10 container mx-auto px-4 py-16'>
                <motion.h1
                    className='text-center text-4xl font-bold text-red-400 mb-8'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Admin Dashboard
                </motion.h1>

                <div className='flex justify-center mb-8'>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${activeTab === tab.id ? 'bg-red-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                        >
                            <tab.icon className='mr-3 h-6 w-6' />
                            {tab.label}
                        </button>
                    ))}
                </div>
                    {activeTab === "create" && <CreateProductForm />}
                    {activeTab === "products" && <ProductsList />}
                    {activeTab === "analytics" && <AnalyticsTab />}
            </div>

        </div>
    );

}

export default AdminPage;