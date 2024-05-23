const mongoose = require('mongoose');
const mongoDBURL = process.env.MONGO_URL;
mongoose.connect(mongoDBURL)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

module.exports = mongoose;