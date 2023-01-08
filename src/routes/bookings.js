const { Router } = require("express");
const router = Router();
const bookingsCtrl = require("../controllers/bookings.js");

router.get("/", bookingsCtrl.getBookings);
router.get("/:id", bookingsCtrl.getBookingsById);
router.post("/", bookingsCtrl.createBooking);
router.put("/paid", bookingsCtrl.changeStatusToPaid);
router.put("/deleted", bookingsCtrl.changeStatusToDeleted);

module.exports = router;
