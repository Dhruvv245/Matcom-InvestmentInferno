const Stock = require("../models/stock");
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}
const moment = require("moment");
const date = moment();

const Student = require("../models/student");
const Admin = require("../models/admin");
const OldStockData = require("../models/oldStockData");

const sentData = {};
const indices = {};
const intervals = {};

module.exports.getChart = async (req, res, next) => {
  const io = req.app.get("socketio");
  const stocks = await Stock.find();
  for (let stock of stocks) {
    const stockNum = stock.stockNum;
    if (intervals[stockNum]) {
      clearInterval(intervals[stockNum]);
      delete intervals[stockNum];
    }
    indices[stockNum] = 0;
    sentData[stockNum] = [];
    intervals[stockNum] = setInterval(async () => {
      if (indices[stockNum] >= stock.stockdata.length) {
        clearInterval(intervals[stockNum]);
        delete intervals[stockNum];
        return;
      }
      const data = stock.stockdata.slice(0, indices[stockNum] + 1);
      sentData[stockNum] = data;
      const latestClosePrice = data[data.length - 1].CLOSE;
      await Stock.updateOne({ stockNum }, { price: latestClosePrice });
      io.emit("stockData", { stockNum, data });

      indices[stockNum]++;
    }, 10000);
  }
  next();
};

module.exports.makeStock = async (req, res, next) => {
  // await new Stock({
  //   stockNum: 1,
  //   name: "test1",
  //   price: 100,
  //   description: "ambani",
  // })
  //   .save()
  //   .then((res) => {
  //     console.log(res);
  //     next();
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  try {
    const data = req.body;
    const newStock = await Stock.create(data);
    res.status(201).send(newStock);
  } catch (error) {
    console.group(error);
    res.status(500).send(error);
  }
};

//api-for getting stocks

module.exports.stockDataFront = async (req, res, next) => {
  const user = req.session.StudentId;
  const leader = await Admin.find();
  const participants = await Student.find();
  if (!leader.length) {
    return next(new Error("No leader found"));
  }
  const check = leader[0].Start;
  if (user) {
    const currentDate = date.format("dddd, MMMM Do YYYY");
    const data = await Stock.find();
    if (check) {
      res.render("stock-view", {
        data: data,
        date: currentDate,
        participants: participants.length,
      });
    } else {
      res.render("start");
    }
  } else {
    res.redirect("login");
  }
};

module.exports.profile = async (req, res) => {
  const user = req.session.StudentId;
  const student = await Student.findById(user);
  const leader = await Admin.find();
  const check = leader[0].Start;
  if (student) {
    const stocks = student.userStock.stocks.length;
    const stock = student.userStock.stocks;
    let price = 0;
    stock &&
      stock.map((stock) => {
        return (price = price + stock.stockid.price * stock.quantity);
      });
    let totalAmount = price + student.amount;
    try {
      await Student.findOneAndUpdate(
        { _id: student._id },
        { totalAmount: totalAmount },
        {
          new: true,
          upsert: true,
        }
      );
    } catch (err) {
      console.log(err);
    }
    pl =
      Math.sqrt(
        (student.amount + price - 200000) * (student.amount + price - 200000)
      ) / 2000;
    pl2 = (student.amount + price - 200000) / 2000;
    if (check) {
      res.render("profile", {
        data: student,
        pl: pl,
        stocks: stocks,
        datas: stock,
        pl2: pl2,
      });
    } else {
      res.render("start");
    }
  } else {
    res.redirect("login");
  }
};

module.exports.stockSingle = async (req, res, next) => {
  try {
    const oldStock = await OldStockData.findOne({
      stockNum: req.params.stockid,
    });
    const oldData = JSON.stringify(oldStock.stockdata);
    const user = req.session.StudentId;
    const leader = await Admin.find();
    const check = leader[0].Start;
    if (user) {
      const currentDate = date.format("dddd, MMMM Do YYYY");

      const stock = await Stock.find({ stockNum: req.params.stockid });
      const student = await Student.findById(user);
      const stocks = student.userStock.stocks;
      if (check) {
        res.render("individual-stock", {
          date: currentDate,
          data: stock[0],
          stocks: stocks,
          num: req.params.stockid,
          oldData,
        });
      } else {
        res.render("start");
      }
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.leader = async (req, res, next) => {
  const user = req.session.StudentId;
  // if (user) {
  await Student.find()
    .sort({ totalAmount: -1 })
    .then(async (result) => {
      // let totalAmount = new Array();

      // const data = result.map((stock) => {
      //   return stock.userStock;
      // });
      console.log(result);
      // for (let Student of result) {
      //   return totalAmount.push({
      //     price: Student.amount,
      //     stock: Student.userStock,
      //   });
      // }
      // console.log(totalAmount);
      // console.log(data);
      // let leader = new Array();
      // function bubbleSort(arr) {
      //   var n = arr.length,
      //     swapped,
      //     tmp;
      //   do {
      //     swapped = false;
      //     for (var i = 1; i < n; i++) {
      //       // console.log(arr[i - 1]);
      //       if (arr[i - 1].amount < arr[i].amount) {
      //         tmp = arr[i];

      //         arr[i] = arr[i - 1];
      //         arr[i - 1] = tmp;

      //         swapped = true;
      //       }
      //     }
      //   } while (swapped && n--);
      // }

      // // console.log(leader);
      const leader = await Admin.find();
      const check = leader[0].leader;
      const score = leader[0].Score;
      console.log(check);
      if (check) {
        res.render("leader", { data: result, score: score });
      } else {
        res.render("closed");
      }
    })
    .catch((err) => {
      console.log(err);
    });

  // } else {
  //   res.redirect("/login");
  // }
};
