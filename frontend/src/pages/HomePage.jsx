import React from 'react'
import { href } from 'react-router-dom';
import CategoryItem from '../components/CategoryItem';

const categories = [
    {href: '/jeans', name: 'Jeans', imageUrl:"/jeans.jpg" },
    {href: '/tshirts', name: 'T-shirts', imageUrl:"/tshirts.jpg" },
    {href: '/shoes', name: 'Shoes', imageUrl:"/shoes.jpg" },
    {href: '/glasses', name: 'Glasses', imageUrl:"/glasses.png" },
    {href: '/jackets', name: 'Jackets', imageUrl:"/jackets.jpg" },
    {href: '/suits', name: 'Suits', imageUrl:"/suits.jpg" },
    {href: '/bags', name: 'Bags', imageUrl:"/bags.jpg" },
];


const HomePage = () => {
  
  return (
    <div className="relative min-h-creen text-white overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-center text-5xl font-bold sm:text-6xl text-red-400 mb-4">
                Browse Our Curiosities
            </h1>
            <p className="text-center text-xl text-gray-400 mb-12">
                Some treasures choose their owner. Explore our latest collection and see what finds you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                    <CategoryItem
                        catergory={category}
                        key={category.name}
                    />
                ))}
            </div>

        </div>
    </div>

    
);
}

export default HomePage
