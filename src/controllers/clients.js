const { Booking, Client } = require("../db");

const getClients = async (req, res) => {
  try {
    res.status(200).json(await Client.findAll({ include: "bookings" }));
  } catch {
    res
      .status(500)
      .json({ message: "El servidor no pudo procesar la solicitud" });
  }
};

const getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    res.status(200).json(await Client.findByPk(id, { include: "bookings" }));
  } catch {
    res
      .status(500)
      .json({ message: "El servidor no pudo procesar la solicitud" });
  }
};

module.exports = {
  getClients,
  getClientById,
};
