const { Booking, Client } = require("../db");

const getClients = async (req, res) => {
  try {
    res.status(200).send(await Client.findAll({ include: "bookings" }));
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getClients,
};
