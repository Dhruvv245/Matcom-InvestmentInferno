const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: String,
  email: String,
  totalAmount: {
    type: Number,

    default: 200000,
  },
  password: String,
  amount: {
    type: Number,

    default: 200000,
  },
  userStock: {
    stocks: [
      {
        stockid: {
          type: Schema.Types.ObjectId,
          ref: "Stock",
          autopopulate: true,
        },
        quantity: { type: Number },
      },
    ],
  },
});
StudentSchema.plugin(require("mongoose-autopopulate"));

StudentSchema.methods.buyStock = function (check, stock, quan, amount) {
  console.log("hit");
  // const stockIndex = this.userStock.stocks.map((stock, index, array) => {
  //   console.log(index);
  //   if (index) {
  //     return index;
  //   } else {
  //     return null;
  //   }
  // });

  const stockIndex = this.userStock.stocks.findIndex((cp) => {
    console.log(cp.stockid);

    return cp.stockid.stockNum === stock;
  });
  console.log(stockIndex);
  let newQuantity = quan;

  const updatedStocks = [...this.userStock.stocks];
  console.log(updatedStocks);

  if (stockIndex >= 0) {
    newQuantity = this.userStock.stocks[stockIndex].quantity + parseInt(quan);
    updatedStocks[stockIndex].quantity = newQuantity;
  } else {
    updatedStocks.push({
      stockid: check,
      quantity: newQuantity,
    });
  }
  console.log(updatedStocks);
  const updatedUserStock = {
    stocks: updatedStocks,
  };
  this.amount = amount;
  this.userStock = updatedUserStock;
  return this.save()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

StudentSchema.methods.sellStock = function (stock, quan, amount) {
  const stockIndex = this.userStock.stocks.findIndex((cp) => {
    return cp.stockid.stockNum === stock;
  });
  console.log(stockIndex);
  let newQuantity = quan;

  const updatedStocks = [...this.userStock.stocks];

  if (stockIndex >= 0) {
    newQuantity = this.userStock.stocks[stockIndex].quantity - quan;
    if (newQuantity <= 0) {
      updatedStocks.splice(stockIndex, 1);
    } else {
      updatedStocks[stockIndex].quantity = newQuantity;
    }
  } else {
    throw "Insufficient stock";
  }
  console.log(updatedStocks);
  const updatedUserStock = {
    stocks: updatedStocks,
  };
  this.amount = amount;
  this.userStock = updatedUserStock;
  return this.save()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoose.model("Student", StudentSchema);
