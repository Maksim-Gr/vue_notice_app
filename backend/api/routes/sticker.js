const express = require("express");
const router = express.Router();
const stickerController = require("../controller/stickerController");


router.get("/",  stickerController.getAllStickers);
router.post("/", stickerController.addNewSticker);
router.delete("/:stickerId", stickerController.deleteSticker);

module.exports = router;
