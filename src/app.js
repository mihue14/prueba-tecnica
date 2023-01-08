const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bookingsRoutes = require("./routes/bookings.js");
const clientsRoutes = require("./routes/clients.js");
const roomsRoutes = require("./routes/rooms");

require("dotenv").config();
require("./db.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/bookings", bookingsRoutes);
app.use("/clients", clientsRoutes);
app.use("/rooms", roomsRoutes);

module.exports = app;
