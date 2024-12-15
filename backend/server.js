// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv=require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware

app.use(express.json());
app.use(cors({
  origin: 'https://vehiclemanagementdashboard.onrender.com', // Allows all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
  
}));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Vehicle Schema
const vehicleSchema = new mongoose.Schema({
  name: String,
  status: String,
  lastUpdated: { type: Date, default: Date.now }
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

// Routes
app.get('/vehicles', async (req, res) => {
  const vehicles = await Vehicle.find();
  res.json(vehicles);
});

app.post('/vehicles', async (req, res) => {
  const newVehicle = new Vehicle(req.body);
  await newVehicle.save();
  res.json(newVehicle);
});

app.put('/vehicles/:id', async (req, res) => {
  const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedVehicle);
});

app.delete('/vehicles/:id', async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  res.json({ message: 'Vehicle deleted' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});