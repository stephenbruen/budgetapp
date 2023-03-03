const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Transaction = require('./models/Transaction');
const mongoose = require('mongoose');

const app = express();

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse incoming request body as JSON
app.use(express.json());

// Test route to check if server is running
app.get('/api/test', (req, res) => {
  res.json('test ok');
});

// Route to create a new transaction
app.post('/api/transactions', async (req, res) => {
  try {
    // Connect to MongoDB database
    await mongoose.connect(process.env.MONGO_URL);

    // Extract data from request body
    const { name, description, datetime, price } = req.body;

    // Create a new transaction document
    const transaction = await Transaction.create({ name, description, datetime, price });

    // Return the new transaction document as JSON
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get all transactions
app.get('/api/transactions', async (req, res) => {
  try {
    // Connect to MongoDB database
    await mongoose.connect(process.env.MONGO_URL);

    // Find all transaction documents and return them as JSON
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
