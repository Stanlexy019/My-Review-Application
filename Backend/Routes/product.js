const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products
router.get('/', async (req, res) => {
  const list = await Product.find({});
  res.json(list);
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  const p = await Product.findById(req.params.id);
  if(!p) return res.status(404).json({ message: 'Not found' });
  res.json(p);
});

// (Optional) create product - you can seed instead
router.post('/', async (req, res) => {
  const p = new Product(req.body);
  await p.save();
  res.status(201).json(p);
});

module.exports = router;
