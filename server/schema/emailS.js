const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  userId: {
    type: Number, // Assuming userId is a number
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Create a model using the schema
const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
