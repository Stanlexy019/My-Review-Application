const express = require('express');
const router = express.Router();
const Feedback = require('../Models/Feedback');
const Product = require('../Models/Product');

// GET /api/feedbacks
router.get('/', async (req, res) => {
  const list = await Feedback.find({}).sort({ createdAt: -1 });
  res.json(list);
});

// POST /api/feedbacks
router.post('/', async (req, res) => {
  const { productId, name, message, rating } = req.body;
  const fb = new Feedback({ productId, name, message, rating });
  await fb.save();

  // if productId provided, increment product reviews count (best-effort)
  if(productId){
    try{
      await Product.findByIdAndUpdate(productId, { $inc: { reviews: 1 }});
    }catch(e){}
  }
  res.status(201).json(fb);
});

module.exports = router;
