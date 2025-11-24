const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    pay: {
      type: String,
      enum: ["Loosers pay", "50-50", "70-30", "60-40"],
      default: "Loosers pay",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    playerJoined: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Match = mongoose.model("Match", matchSchema);
module.exports = Match;
