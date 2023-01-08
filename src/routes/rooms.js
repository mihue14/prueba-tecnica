const { Router } = require("express");
const router = Router();
const roomsCtrl = require("../controllers/rooms");

router.get("/", roomsCtrl.getRooms);
router.post("/", roomsCtrl.createRoom);

module.exports = router;
