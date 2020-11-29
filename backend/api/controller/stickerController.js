let mongoose = require("mongoose");
const Sticker = require("../model/Sticker");

exports.getAllStickers = async (req, res) => {
  try {
    let sticker = await Sticker.find();
    res.status(200).json(sticker);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addNewSticker = async (req, res) => {
  try {
    const sticker = new Sticker({
      title:req.body.title,
      description:req.body.description,
    });
     console.log(sticker)
    let newSticker = await sticker.save();
   
    res.status(200).json({ data: newSticker });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.deleteSticker = async (req, res) => {
  try {
    const id = req.params.stickerId;
    let result = await Sticker.remove({ _id: id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

