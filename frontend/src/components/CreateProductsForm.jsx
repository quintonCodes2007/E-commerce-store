import React from 'react'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Upload, Loader } from 'lucide-react';

const categories = ['Organs', 'Cursed Artifacts', 'Forbidden Library', 'Creepy Collectibles', 'Paranormal', "Witches' Apothecary", 'The \"Questionable\" Shelf', 'Lost & Found (Definitely Not Stolen)'];

const CreateProductsForm = () => {

    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newProduct);
    }

  return (
    <motion.div
        className='bg-red-300/10 shadow-lg rounded-lg p-8 max-w-xl mx-auto'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
    >
        <h2 className='text-2xl font-extrabold mb-4  text-red-400 text-center'>Create a new product</h2>

        <form onSubmit={handleSubmit}>
            <div>
                {/* <label htmlFor="name" className='block text-sm font-medium text-gray-300'>Product Name</label> */}
                <input
                    id='name'
                    type='text'
                    name='name'
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className='mt-1 block w-full border border-red-400/40 rounded-md  shadow-sm py-2 px-3 focus:border-red-400 focus:ring-1 focus:ring-red-500 focus:outline-none mb-3'
                    required placeholder='Product name'
                />
            </div>

            
            <div>
                {/* <label htmlFor="name" className='block text-sm font-medium text-gray-300'>Product Name</label> */}
                <textarea
                    id='description'
                    name='description'
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className='mt-1 block w-full border border-red-400/40 rounded-md  shadow-sm py-2 px-3 focus:border-red-400 focus:ring-1 focus:ring-red-500 focus:outline-none mb-3'
                    required placeholder='Product description'
                />
            </div>

            <div>
                {/* <label htmlFor="name" className='block text-sm font-medium text-gray-300'>Product Name</label> */}
                <input
                    id='price'
                    type='number'
                    name='price'
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    step='0.01'
                    className='mt-1 block w-full border border-red-400/40 rounded-md  shadow-sm py-2 px-3 focus:border-red-400 focus:ring-1 focus:ring-red-500 focus:outline-none mb-3'
                    required placeholder='Product price'
                />
            </div>

            <div>
                {/* <label htmlFor="name" className='block text-sm font-medium text-gray-300'>Product Category</label> */}
                <select
                    id='category'
                    name='category'
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className='mt-1 block w-full border border-red-400/40 rounded-md  shadow-sm py-2 px-3 focus:border-red-400 focus:ring-1 focus:ring-red-500 focus:outline-none mb-3'
                    required
                >
                <option className="bg-gray-800 text-red-400" value=''>Select a category</option>
                {categories.map((category) => (
                    <option key={category} value={category} className="bg-gray-900 text-red-400">
                        {category}
                    </option>
                ))}
                </select>
            </div>

            <div className='mt-1 flex items-center'>
                <input type="file" id='image' className='sr-only' accept='image/*' />
                <label htmlFor="image" className='cursor-pointer  py-2 block w-full text-center border border-red-400 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-red-800/30 focus:outline-none focus:ring-1 focus:ring-offset  focus:ring-red-500'
                >
                    <Upload className='h-5 w-5 inline-block mr-2' />
                    Upload an image
                </label>
                {newProduct.image && <span className='ml-3 text-sm text-gray-400'>{newProduct.image}</span>}
            </div>
        </form>
    </motion.div>
  );
};

export default CreateProductsForm;