const express = require('express');
const router = express.Router();
const Product = require('../Models/Product'); // fixed path (capital M)

// ✅ GET all products - /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching products' });
  }
});

// ✅ GET single product by ID - /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving product' });
  }
});

// ✅ POST create new product - /api/products
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: 'Error creating product', error: err });
  }
});

module.exports = router;
