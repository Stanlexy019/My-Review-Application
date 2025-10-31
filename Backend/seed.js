const mongoose = require('mongoose');
const Product = require('./Models/product');
const dotenv = require('dotenv');

dotenv.config();

const products = [
  {
    name: 'TechPro Headphones',
    description: 'High-quality wireless headphones with noise cancellation.',
    price: 99.99,
    category: 'Electronics',
    image: 'https://via.placeholder.com/200x200?text=Headphones'
  },
  {
    name: 'QuickFit Smartwatch',
    description: 'Tracks your heart rate, sleep, and fitness activities.',
    price: 149.99,
    category: 'Wearables',
    image: 'https://via.placeholder.com/200x200?text=Smartwatch'
  },
  {
    name: 'ComfyHome Cushion',
    description: 'Ergonomic cushion for extra comfort while working.',
    price: 39.99,
    category: 'Home & Living',
    image: 'https://via.placeholder.com/200x200?text=Cushion'
  },
  {
    name: 'VisionX Keyboard',
    description: 'Wireless keyboard with backlight and silent keys.',
    price: 59.99,
    category: 'Electronics',
    image: 'https://via.placeholder.com/200x200?text=Keyboard'
  },
  {
    name: 'PowerLite 20000mAh Powerbank',
    description: 'Ultra-fast charging powerbank with dual USB ports and LED display.',
    price: 49.99,
    category: 'Electronics',
    image: 'https://via.placeholder.com/200x200?text=Powerbank'
  },
  {
    name: 'ZenSound Wireless Speaker',
    description: 'Compact portable Bluetooth speaker with deep bass and waterproof design.',
    price: 89.99,
    category: 'Audio',
    image: 'https://via.placeholder.com/200x200?text=Speaker'
  },
  {
    name: 'SmartVision 4K Monitor',
    description: 'Crisp and clear 27-inch 4K display for designers and gamers.',
    price: 299.99,
    category: 'Electronics',
    image: 'https://via.placeholder.com/200x200?text=Monitor'
  },
  {
    name: 'HomeGlow LED Lamp',
    description: 'Adjustable LED lamp with touch control and brightness levels.',
    price: 24.99,
    category: 'Home & Living',
    image: 'https://via.placeholder.com/200x200?text=Lamp'
  },
  {
    name: 'ProCharge USB Hub',
    description: '7-port high-speed USB hub with power delivery.',
    price: 19.99,
    category: 'Accessories',
    image: 'https://via.placeholder.com/200x200?text=USB+Hub'
  },
  {
    name: 'AirPure Mini Humidifier',
    description: 'Portable humidifier with night light feature and silent operation.',
    price: 34.99,
    category: 'Home & Health',
    image: 'https://via.placeholder.com/200x200?text=Humidifier'
  }
];

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/quickreview', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('✅ Products seeded successfully!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('❌ Error seeding products:', err);
  });
