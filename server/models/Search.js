const mongoose = require('mongoose');

const SearchSchema = new mongoose.Schema({
  city: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  weather: {
    temp: Number,
    humidity: Number,
    wind: Number,
    condition: String,
    icon: String
  }
});

module.exports = mongoose.model('Search', SearchSchema);
