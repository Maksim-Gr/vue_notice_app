const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");
const sticker_app = express();



mongoose.set("useCreateIndex", true);
mongoose
  .connect(config.database, { useNewUrlParser: true })
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log({ database_error: err });
  });



sticker_app.use(cors());

sticker_app.use(bodyParser.urlencoded({ extended: true }));
sticker_app.use(bodyParser.json());


sticker_app.use(morgan("dev"));


sticker_app.get("/", (req, res) => {
  res.json("Default");
});

const stickerRoutes = require("./api/routes/sticker"); 
sticker_app.use("/sticker", stickerRoutes)

sticker_app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
