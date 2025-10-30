require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const productsRoutes = require('. /routes/products');
const feedbackRoutes = require('. /routes/feedbacks');
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
// API prefix
app.use('/api/products', productsRoutes);
app.use('/api/feedbacks', feedbackRoutes);

// serve frontend static files (optional: you will use Nginx in front later)
app.use('/', express.static(path.join(__dirname, '..', 'frontend')));

// connect mongodb
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/quickreview';
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error', err));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on ${port}`));
