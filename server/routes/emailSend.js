const express = require("express");
const router = new express.Router();
const nodemailer = require("nodemailer");

// send mail using nodemailer
router.post("/", (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sanpatel701@gmail.com",
        pass: process.env.PASSWORD,
      },
    });
    const to = req.body.to + "";
    console.log(`hii ever ${req.body.to}`);
    const mailOptions = {
      from: req.body.from,
      to: to,
      subject: req.body.subject,
      html: req.body.message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error" + error);
      } else {
        console.log("Email sent:" + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
  } catch (error) {
    console.log("Error" + error);
    res.status(401).json({ status: 401, error });
  }
});

module.exports = router;
