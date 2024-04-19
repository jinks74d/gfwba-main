// contactImage.js
const mongoose = require("mongoose");

const contactImageSchema = new mongoose.Schema({
  wildapricotUserId: { type: String, required: true },
  localUrl: { type: String },
  wildapricotUrl: { type: String },
  profileUpdatedDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

const ContactImage = mongoose.model("ContactImage", contactImageSchema);

module.exports = ContactImage;