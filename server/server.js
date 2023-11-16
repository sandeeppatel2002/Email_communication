// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const passport = require("passport");
// const authRoute = require("./routes/auth");
// const communicationRoute = require("./routes/communication");
// const cookieSession = require("cookie-session");
// const passportStrategy = require("./passport");
// const mongoose = require("mongoose");
// const session = require("express-session");
// const mg = require("mailgun-js");

// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error(err));

// const mailgun = () =>
//   mg({
//     apiKey: process.env.MAILGUN_API_KEY,
//     domain: process.env.MAILGUN_DOMIAN,
//   });

// const app = express();
// app.use(express.json());
// app.use(
//   session({
//     secret: process.env.CLIENT_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// // app.use(
// //   cookieSession({
// //     name: "session",
// //     keys: ["cyberwolve"],
// //     maxAge: 24 * 60 * 60 * 100,
// //   })
// // );

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(express.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//   })
// );
// app.post("/api/emailSend", (req, res) => {
//   const { f, email, subject, message } = req.body;
//   mailgun()
//     .messages()
//     .send(
//       {
//         from: `${f}`,
//         to: `${email}`,
//         subject: `${subject}`,
//         html: `<p>${message}</p>`,
//       },
//       (error, body) => {
//         if (error) {
//           console.log(error);
//           res.status(500).send({ message: "Error in sending email" });
//         } else {
//           console.log(body);
//           res.send({ message: "Email sent successfully" });
//         }
//       }
//     );
// });

// app.use("/auth", authRoute);
// app.use("/main", communicationRoute);

// const port = process.env.PORT || 8080;
// app.listen(port, () => console.log(`Listenting on port ${port}...`));

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const emailSendRoute = require("./routes/emailSend");
const communicationRoute = require("./routes/communication");
const passportStrategy = require("./passport");
const mongoose = require("mongoose");
const session = require("express-session");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

const app = express();
app.use(express.json());
app.use(
  session({
    secret: process.env.CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);
app.use("/api/emailSend", emailSendRoute);
app.use("/fetch", communicationRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
