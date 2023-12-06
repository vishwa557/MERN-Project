const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
const connectionString = process.env.DB_CONNECTION_STRING;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(connectionString);

const formDataSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  address: String,
});

const FormData = mongoose.model('FormData', formDataSchema);

// POST route to handle form submissions
app.post('/submit-form', async (req, res) => {
  try {
    console.log(req.body);
    const formData = new FormData(req.body);
    const savedData = await formData.save();
    res.status(201).send(savedData);
    
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET endpoint to fetch available fields for configuration
app.get('/available-fields', (req, res) => {
  const availableFields = ['name', 'age', 'gender', 'address'];
  res.status(200).json({ fields: availableFields });
});

// GET endpoint to fetch submitted form data (optional)
app.get('/submitted-data', async (req, res) => {
  try {
    const formData = await FormData.find({});
    res.status(200).json(formData);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
