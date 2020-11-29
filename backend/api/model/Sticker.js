let mongoose = require("mongoose");
let stickerSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});
let Sticker = mongoose.model("Sticker", stickerSchema);
module.exports = Sticker;
