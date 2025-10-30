require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/quickreview';

const items = [
  { name: "Aurora Headphones", short: "Clear sound, comfy", long: "Aurora delivers crisp audio and comfortable fit for long listening sessions.", price: 59.99 },
  { name: "Zephyr Lamp", short: "Warm desk lamp", long: "Minimalist lamp with adjustable brightness and USB charging.", price: 29.5 },
  { name: "Comet Mug", short: "Thermal ceramic mug", long: "Keeps drinks warm, stylish matte finish.", price: 14.99 }
];

mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async ()=> {
    await Product.deleteMany({});
    await Product.insertMany(items);
    console.log('Seeded products');
    process.exit(0);
  })
  .catch(err => { console.error(err); process.exit(1); });
