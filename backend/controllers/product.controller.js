import { redis } from '../lib/redis.js';
import cloudinary from '../lib/cloudinary.js';
import Product from '../models/product.model.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});//find all products in the database
        res.json({products});
    } catch (error) {
        console.log("Error in getAllProducts controller:", error.message);
        res.status(500).json({message: "Server error", error:error.message});
    }
}; 

export const getFeaturedProducts = async (req, res) => {
    try{
        let featuredProducts = await redis.get("featuredProducts");
        if(featuredProducts) {
            return res.json(JSON.parse(featuredProducts));
        }

        //if not in redis, fetch from database
        //.lean() is used to return plain JavaScript objects instead of Mongoose documents, which can improve performance when you don't need the full Mongoose document functionality.
        
        featuredProducts = await Product.find({isFeatured: true}).lean();

        if(!featuredProducts) {
            return res.status(404).json({message: "No featured products found"});
        }

        //store in redis for 1 hour
        await redis.set("featuredProducts", JSON.stringify(featuredProducts), "EX", 3600);

        res.json(featuredProducts);
    } catch(error){
        console.log("Error in getFeaturedProducts controller:", error.message);
        res.status(500).json({message: "Server error", error:error.message});
    }

}


export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category} = req.body;
        let cloudinaryResponse = null;

        if(image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, {folder: "products"});
        }

        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ?  cloudinaryResponse.secure_url : "",
            category
        });

        res.status(201).json(product);
    } catch (error) {
        console.log("Error in createProduct controller:", error.message);
        res.status(500).json({message: "Server error", error:error.message});
    }
}