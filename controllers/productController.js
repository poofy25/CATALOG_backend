const fs = require('fs');
const path = require('path');
const Product = require('../models/productModel')


const getProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from the database
    
        // Append image paths to product data
        const productsWithImages = await Promise.all(products.map(async (product) => {
            const imagePath = product.imagePath;
                if (fs.existsSync(imagePath)) {
                    const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });
                return {
                    ...product.toObject(),
                    imageBase64: `data:image/jpeg;base64,${imageBase64}`
                };
                } else {
                    return {
                        ...product.toObject(),
                        imageBase64: null
                    }
                }
        }));
    
        res.status(200).json(productsWithImages);
      } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports = { getProducts }