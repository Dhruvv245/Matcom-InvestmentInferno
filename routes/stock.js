const Stock = require("../models/stock");
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}
const moment = require("moment");
const date = moment();

const Student = require("../models/student");
const Admin = require("../models/admin");

module.exports.getChart = async (req, res, next) => {
  const io = req.app.get("socketio");
  const stockNum = req.params.num;
  const indices = {};
  const intervals = {};
  io.on("connection", (socket) => {
    socket.on("join", async (data) => {
      socket.join(data);
      if (!indices[data]) {
        indices[data] = 0;
      }
      const stock = await Stock.findOne({ stockNum: data });
      if (!stock) {
        return;
      }
      if (!intervals[data]) {
        intervals[data] = setInterval(() => {
          if (indices[data] >= stock.stockdata.length) {
            clearInterval(intervals[data]);
            delete intervals[data];
            return;
          }
          io.to(data).emit(
            "stockData",
            stock.stockdata.slice(0, indices[data] + 1)
          );
          indices[data]++;
        }, 15000);
      }
    });
  });
  res.render("chart", {
    title: "Chart",
    stockNum,
  });
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
    console.log(data);
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
  if (!leader.length) {
    console.log("No leader found");
    return res.status(404).send("No leader found");
  }
  const check = leader[0].Start;
  if (student) {
    const stocks = student.userStock.stocks.length;
    const stock = student.userStock.stocks;

    // let newStocks = new Array();

    // stock.map(async (stock, index) => {
    //   let data = await Stock.findById(stock.stockid);
    let price = 0;
    stock &&
      stock.map((stock) => {
        return (price = price + stock?.stockid?.price * stock?.quantity);
      });
    console.log(price);
    let totalAmount = price + student.amount;
    await Student.findOneAndUpdate(
      { _id: student._id },
      { totalAmount: totalAmount },
      {
        new: true,
        upsert: true, // Make this update into an upsert
      }
    )
      .then((result) => {
        // console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(student.totalAmount);
    pl =
      Math.sqrt(
        (student.amount + price - 20000) * (student.amount + price - 20000)
      ) / 200;
    pl2 = (student.amount + price - 20000) / 200;
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
      });
    } else {
      res.render("start");
    }
  } else {
    res.redirect("/login");
  }
};
2;

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
