require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// import routes
const productRoutes = require('./Routes/product');
const feedbackRoutes = require('./Routes/feedbacks');

const app = express();

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// api routes
app.use('/api/products', productRoutes);
app.use('/api/feedbacks', feedbackRoutes);

// connect MongoDB
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/quickreview';
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => console.error('❌ MongoDB error:', err));

// start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));

