import React from 'react'
import { useProductStore } from '../stores/useProductStore'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
console.log("zg")

const CategoryPage = () => {
    const { fetchProductsByCategory, products } = useProductStore();

    const { category } = useParams();

    useEffect(() => {
        fetchProductsByCategory(category);
    }, [fetchProductsByCategory, category])

    console.log("products:", products);

    return (
        <div>Category</div>
        
    );console.log("zg")
}

export default CategoryPage