if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const http = require(`http`);
const { Server } = require(`socket.io`);
const port = process.env.PORT || 8080;
const path = require("path");
const mongoose = require("mongoose");
const Stock = require("./models/stock");
const User = require("./models/student")
const stock = require("./routes/stock");
const login = require("./routes/login");
const userStock = require("./routes/user-stock");
const admin = require("./admin/admin");
const console = require("console");
const MONGODB_URI = process.env.MONGODB_URI;
const cors = require("cors");
const session = require("express-session");
const { makeStock } = require("./routes/stock");
const compression = require("compression");

const stockPrice = () => {
  const date = new Date();
  const minutes = date.getMinutes();
  var value = "";
  console.log(minutes);
  if (minutes / 2) {
    value = 5;
  } else if (minutes / 3) {
    value = -0.5;
  } else if (minutes / 5) {
    value = 2;
  } else if (minutes / 7) {
    value = -5;
  } else if (minutes / 11) {
    value = 7;
  } else if (minutes / 13) {
    value = -7;
  } else if (minutes / 17) {
    value = 11;
  } else if (minutes / 19) {
    value = -16;
  } else if (minutes / 23) {
    value = 16;
  } else if (minutes / 29) {
    value = 2;
  } else if (minutes / 31) {
    value = -2;
  } else if (minutes / 37) {
    value = 25;
  } else if (minutes / 41) {
    value = -25;
  } else if (minutes / 43) {
    value = 22;
  } else if (minutes / 47) {
    value = -9;
  } else if (minutes / 53) {
    value = -10;
  } else if (minutes / 59) {
    value = 6;
  } else {
    value = 0.7;
  }
  return value;
};

const check = stockPrice();
const server = http.createServer(app);
const io = new Server(server);
app.set("socketio", io);

console.log(check);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());
const sessionConfig = {
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));

//admin routes

app.use("/Matcom@Stock123456Admin", admin);

//Old data create
app.get(`/oldStock/:num`, async (req, res) => {
  try {
    const stock = await OldStockData.findOne({ stockNum: req.params.num });
    res.status(201).json({
      stock,
    });
  } catch (err) {
    console.log(err);
  }
});

//login routes
app.get("/login", (req, res) => {
  console.log(req.session);
  res.render("login2");
});

app.post(
  "/login2",

  login.UserLogin
);

//register routes
app.get("/", (req, res) => {
  res.render("login");
});
app.post(
  "/login",

  login.UserRegister
);

//user-profile route
app.get("/profile", stock.profile);

//stock-list route
app.get("/stock-list", stock.stockDataFront);

//individual stocks route
// app.get("/stock/chart/:num",stock.getChart);
app.get("/stock/:stockid", stock.stockSingle);

//create Stock
app.post("/createStock", makeStock);

//buy-sell logic
app.post("/stock/:stockid", userStock.buy);
app.post("/stock2/:stockid", userStock.sell);

//leaderboard route

app.get("/leaderBoard", stock.leader);

//stocks api
app.get("/stock-api", async (req, res) => {
  await Stock.find({ stockNum: parseInt(req.query.num) })
    .then((result) => {
      const stockPrice = result[0].price + check;
      console.log(stockPrice);
      res
        .status(200)
        .send({ message: "succes", data: result[0], stockPrice: stockPrice });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.patch("/stock/tips", async (req, res) => {
  const userId = req.session.StudentId;
  if (userId) {
    const user = await User.findById({ _id: userId });
    if (user.amount < 1000) {
      io.emit("message", {
        data: { message: "You Don't Have Enough Money For This Service" },
      });
      res.redirect("/individual-stock");
      return;
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: userId },
        { amount: user.amount - 1000 },
        { new: true }
      );
      res.redirect("/individual-stock");
    }
  }
});

mongoose
  .connect(MONGODB_URI)
  .then(async (result) => {
    console.log("Database Connected!!");
    server.listen(port, () => {
      console.log("lets goo");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.all("*", (req, res, next) => {
  next(res.render("test"));
});
