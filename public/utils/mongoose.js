const mongoose = require('mongoose');
const mongoDBURL = process.env.MONGO_URL;
mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = mongoose;