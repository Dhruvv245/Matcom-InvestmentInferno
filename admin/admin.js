const express = require("express");
const router = express.Router();
const Stock = require("../models/stock");
const Student = require("../models/student");
const Admin = require("../models/admin");
const getChart = require(`../routes/stock`).getChart;

router.route("/test").get(async (req, res) => {
  const stocks = await Stock.find();
  const students = await Student.find().sort({ totalAmount: -1 });

  res.render("admin", { stocks: stocks, students: students });
});

router
  .route("/test2")
  .get((req, res) => {
    res.render("adminStockMake");
  })
  .post(async (req, res, next) => {
    const { name, stockNum, price, description } = req.body;
    console.log(req.body, name, stockNum, price, description);
    await new Stock({
      stockNum: stockNum,
      name: name,
      price: parseFloat(price),
      description: description,
    })
      .save()
      .then((result) => {
        res.redirect("/Matcom@Stock123456Admin/test2");
      })
      .catch((err) => {
        console.log(err);
        res.status(201).send({ message: err });
      });
  });

router
  .route("/test3")
  .get(async (req, res) => {
    const stocks = await Stock.find();
    res.render("editStock", { stocks: stocks });
  })
  .post(async (req, res, next) => {
    console.log(req.body);
    await Stock.findOneAndUpdate(
      { stockNum: req.body.stockNum },
      { price: req.body.price }
    )
      .then((result) => {
        console.log(result);
        res.redirect("/Matcom@Stock123456Admin/test");
      })
      .catch((err) => {
        res.status(201).send({ message: err });
      });
  });

router
  .route("/test4")
  .get(async (req, res, next) => {
    console.log(req.body);

    res.render("createMessage");
  })
  .post(async (req, res, next) => {
    console.log(req.body);
    const stockNum = req.body.stockNum;
    const filter = { stockNum: stockNum };
    const update = { message: req.body.message };
    await Stock.findOneAndUpdate(filter, update, {
      new: true,
    })
      .then((result) => {
        res.redirect("/Matcom@Stock123456Admin/test");
      })
      .catch((err) => {
        res.status(201).send({ message: err });
      });
  });

router.route("/test5").get(async (req, res) => {
  await Admin.findOneAndUpdate(
    { _id: "6431cd246b8a210baa7d1fe0" },
    { leader: false },
    {
      new: true,
      upsert: true, 
    }
  )
    .then((result) => {
      console.log(result);
      res.redirect("/Matcom@Stock123456Admin/test");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/test6").get(async (req, res) => {
  await Admin.findOneAndUpdate(
    { _id: "6431cd246b8a210baa7d1fe0" },
    { leader: true },
    {
      new: true,
      upsert: true,
    }
  )
    .then((result) => {
      console.log(result);
      res.redirect("/Matcom@Stock123456Admin/test");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/test7").get(getChart,async (req, res) => {
  await Admin.findOneAndUpdate(
    { _id: "6431cd246b8a210baa7d1fe0" },
    { Start: true },
    {
      new: true,
      upsert: true, 
    }
  )
    .then((result) => {
      console.log(result);
      res.redirect("/Matcom@Stock123456Admin/test");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/test8").get(async (req, res) => {
  await Admin.findOneAndUpdate(
    { _id: "6431cd246b8a210baa7d1fe0" },
    { Start: false },
    {
      new: true,
      upsert: true,
    }
  )
    .then((result) => {
      console.log(result);
      res.redirect("/Matcom@Stock123456Admin/test");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/test9").get(async (req, res) => {
  await Admin.findOneAndUpdate(
    { _id: "6431cd246b8a210baa7d1fe0" },
    { Score: true },
    {
      new: true,
      upsert: true,
    }
  )
    .then((result) => {
      console.log(result);
      res.redirect("/Matcom@Stock123456Admin/test");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/test10").get(async (req, res) => {
  await Admin.findOneAndUpdate(
    { _id: "6431cd246b8a210baa7d1fe0" },
    { Score: false },
    {
      new: true,
      upsert: true, 
    }
  )
    .then((result) => {
      console.log(result);
      res.redirect("/Matcom@Stock123456Admin/test");
    })
    .catch((err) => {
      console.log(err);
    });
});

router
  .route("/test11")
  .get(async (req, res) => {
    res.render("give");
  })
  .post(async (req, res) => {
    const user = req.body.user;
    console.log(req.body);
    // const email = req.body.email;
    const quantity = req.body.quantity;
    if (user) {
      await Student.findOne({ email: user })
        .then(async (result) => {
          console.log(result);
          const stock = await Stock.find({ stockNum: req.body.stockNum });
          console.log(stock, "hereee");
          if (result.amount > quantity * stock[0].price) {
            const amount = result.amount - quantity * stock[0].price;
            data = await result.buyStock(
              stock[0]._id,
              stock[0].stockNum,
              quantity,
              amount
            );
            res.redirect("/Matcom@Stock123456Admin/test");
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
  });

module.exports = router;
