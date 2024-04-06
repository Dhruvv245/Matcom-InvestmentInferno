const mongoose = require('mongoose');

const StockStateSchema = new mongoose.Schema({
  stockNum: {
    type: String,
    required: true,
    unique: true
  },
  index: {
    type: Number,
    default: 0
  }
});

const StockState = mongoose.model('StockState', StockStateSchema);

module.exports = StockState;