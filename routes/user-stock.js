const Student = require("../models/student");
const Stock = require("../models/stock");

module.exports.buy = async (req, res, next) => {
  const user = req.session.StudentId;
  // const email = req.body.email;
  const quantity = req.body.quantity;
  if (user) {
    await Student.findById(user)
      .then(async (result) => {
        console.log(result);
        const stock = await Stock.find({ stockNum: req.params.stockid });
        console.log(stock, "hereee");
        if (result.amount > quantity * stock[0].price) {
          const amount = result.amount - quantity * stock[0].price;
          data = await result.buyStock(
            stock[0]._id,
            stock[0].stockNum,
            quantity,
            amount
          );
          res.redirect("/profile");
        } else {
          res.render("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.redirect("/login");
  }
};

module.exports.sell = async (req, res, next) => {
  const stockNum = req.params.stockid;
  const user = req.session.StudentId;
  const quantity = req.body.quantity;
  if (user) {
    await Student.findById(user)
      .then(async (result) => {
        const stock = await Stock.findOne({ stockNum: stockNum });
        console.log("sell");

        const stockIndex = result.userStock.stocks.findIndex((cp) => {
          return cp.stockid.stockNum === stockNum;
        });

        const quan = result.userStock.stocks[stockIndex].quantity;
        if (quan >= quantity) {
          const amount = result.amount + quantity * stock.price;
          data = await result.sellStock(stock.stockNum, quantity, amount);
          res.redirect("/profile");
        } else {
          res.render("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.redirect("/login");
  }
};
