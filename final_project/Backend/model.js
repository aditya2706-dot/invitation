const mongoose = require("mongoose");

const rsvpSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      trim: true,
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

const RSVP = mongoose.model("RSVP", rsvpSchema);

module.exports = RSVP;
