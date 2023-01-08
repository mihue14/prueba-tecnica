const { Booking, Client, Room } = require("../db");

const getRooms = async (req, res) => {
  try {
    // Obtenemos todas las habitaciones incluyendo sus reservas.
    res.status(200).send(await Room.findAll({ include: "bookings" }));
  } catch {
    res
      .status(500)
      .json({ message: "El servidor no pudo procesar la solicitud" });
  }
};

const getRoomByID = async (req, res) => {
  const { id } = req.params;
  try {
    // Obtenemos la habitacion por su ID.
    res.status(200).send(await Room.findByPk(id, { include: "bookings" }));
  } catch {
    res
      .status(500)
      .json({ message: "El servidor no pudo procesar la solicitud" });
  }
};

const createRoom = async (req, res) => {
  let { description } = req.body;

  try {
    // Creamos la habitación.
    let postRoom = await Room.create({ description });
    res
      .status(200)
      .json({ message: "¡Habitación creada con éxito!", postRoom });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "El servidor no pudo procesar la solicitud" });
  }
};

module.exports = {
  getRooms,
  getRoomByID,
  createRoom,
};
