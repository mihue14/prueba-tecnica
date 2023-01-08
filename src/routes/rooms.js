const { Router } = require("express");
const router = Router();
const roomsCtrl = require("../controllers/rooms");

router.get("/", roomsCtrl.getRooms);
router.get("/:id", roomsCtrl.getRoomByID);
router.post("/", roomsCtrl.createRoom);

module.exports = router;
