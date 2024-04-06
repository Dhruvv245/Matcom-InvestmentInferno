const bcrypt = require("bcrypt");
const Student = require("../models/student");
const nodemailer = require("nodemailer");

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_MAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Lets go babbyy");
  }
});

const generator = require("generate-password");

module.exports.UserRegister = async (req, res, next) => {
  console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;

  const user = await Student.findOne({ email: req.body.email });
  if (user) {
    return res
      .status(409)
      .send({ message: "User with the given email already exists" });
  }

  const password = generator.generate({
    length: 6,
    numbers: true,
  });

  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashPassword = await bcrypt.hash(password, salt);

  await new Student({ name: name, email: email, password: hashPassword })
    .save()
    .then(() => {
      const mailOptions = {
        from: process.env.GMAIL_MAIL,
        to: email,
        subject: "Welcome to BSC EXCHANGE",
        html: `Dear ${name} your password is :-${password}. Please use this to login again.`};

      transporter
        .sendMail(mailOptions)
        .then(() => {
          //email sent and verification saved

          res.render("thankU");
        })
        .catch((err) => {
          console.log(err);
          res.status(201).json({
            type: "failure",
            message: "denial email not sent",
          });
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.UserLogin = async (req, res, next) => {
  console.log(req.body);

  try {
    await Student.findOne({ email: req.body.email })
      .then(async (result) => {
        console.log(result);
        if (!result) {
          return res.status(401).redirect("/");
        }
        const validPassword = await bcrypt.compare(
          req.body.password,
          result.password
        );
        if (!validPassword) {
          return res
            .status(401)
            .send({ message: "Invalid password or Password" });
        } else {
          console.log(req.session.id);
          req.session.StudentId = result.id;
          res.redirect("/profile");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports.test = (req, res) => {
  console.log(req.body);
};
