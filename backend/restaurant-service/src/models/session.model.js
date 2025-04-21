const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expiresIn: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: "24h"
  },
  ipAddress: {
    type: String,
    default: "",
  },
  deviceInfo: {
    type: String,
    default: "",
  },
});

const Session  = mongoose.model('Session', sessionSchema)

module.exports = Session;
