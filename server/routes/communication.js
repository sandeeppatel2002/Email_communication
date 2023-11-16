// routes/communication.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const EmailS = require("../schema/emailS");

// Fetch user communication emails details
router.get("/email/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const sentEmails = await EmailS.find({ userId: userId });
    console.log("Query:", { userId: userId });
    console.log("Result:", sentEmails);

    res.json(sentEmails);
  } catch (error) {
    console.error("Error retrieving emails:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// post new  user email in databsse
router.post("/post/:userId", async (req, res) => {
  try {
    // Create a new instance of the EmailS model
    const newEmail = new EmailS({
      userId: req.params.userId,
      from: req.body.from,
      to: req.body.to,
      subject: req.body.subject,
      message: req.body.message,
    });

    // Save the new email to the database
    await newEmail.save();

    console.log("Email saved:", newEmail);

    // Return a success response
    res.json({ message: "Email saved successfully", email: newEmail });
  } catch (error) {
    console.error("Error saving email:", error);

    // Return an error response
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
