const mongoose = require(`mongoose`);

const oldStockDataSchema = new mongoose.Schema({
  stockNum: Number,
  stockdata: [
    {
      OPEN: Number,
      HIGH: Number,
      LOW: Number,
      CLOSE: Number,
    },
  ],
});

module.exports = mongoose.model(`OldStockData`, oldStockDataSchema);
