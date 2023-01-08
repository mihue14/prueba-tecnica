const { Booking, Client, Room } = require("../db");

const getBookings = async (req, res) => {
  try {
    // Buscamos todos las reservas incluyendo el cliente asociado a ellas.
    res
      .status(200)
      .json(await Booking.findAll({ include: ["client", "room"] }));
  } catch {
    res
      .status(500)
      .json({ message: "El servidor no pudo procesar la solicitud" });
  }
};

const getBookingsById = async (req, res) => {
  const { id } = req.params;
  try {
    res
      .status(200)
      .json(await Booking.findByPk(id, { include: ["client", "room"] }));
  } catch {
    res
      .status(500)
      .json({ message: "El servidor no pudo procesar la solicitud" });
  }
};

const createBooking = async (req, res) => {
  const {
    roomId,
    name,
    lastname,
    email,
    NIT,
    checkIn,
    checkOut,
    amount,
    paymentMethod,
  } = req.body;

  try {
    // Buscamos el cliente. Si no existe lo creamos en la base da datos.
    const clientDB = await Client.findOrCreate({
      where: {
        name,
        lastname,
        email,
      },
    });

    // Buscamos la habitación que quiere reservar.
    const roomDB = await Room.findOne({
      where: { id: roomId },
      include: "bookings",
    });

    // Obtenemos todas los checkIns de esa habitación.
    const roomDBCheckIns = roomDB.dataValues.bookings.map(
      (b) => b.dataValues.checkIn
    );
    // Obtenemos todas los checkOuts de esa habitación.
    const roomDBCheckOuts = roomDB.dataValues.bookings.map(
      (b) => b.dataValues.checkOut
    );

    // Verificamos que los días que se solicitan no estén previamentes reservados.
    for (let i = 0; i < roomDBCheckIns.length; i++) {
      if (!(roomDBCheckOuts[i] < checkIn || roomDBCheckIns[i] > checkOut))
        return res.status(404).json({ message: "Días ya reservados" });
    }

    // Creamos la reserva y le adjuntamos el ID del cliente.
    const postBooking = await Booking.create({
      billingDetails: { name, lastname, NIT },
      checkIn,
      checkOut,
      amount,
      paymentMethod,
      clientId: clientDB[0].dataValues.id,
      roomId,
    });

    res.status(200).json({ message: "¡Reservado con éxito!", postBooking });
  } catch (err) {
    console.log("🚀 ~ file: bookings.js:61 ~ createBooking ~ err", err);
    res
      .status(500)
      .json({ message: "El servidor no pudo procesar la solicitud" });
  }
};

const changeStatusToPaid = async (req, res) => {
  const { id } = req.body;

  try {
    // Se encuentra una reserva con esa ID
    const findedBooking = await Booking.findOne({ where: { id } });
    if (!findedBooking)
      return res
        .status(404)
        .json({ message: "No se encontró una reserva con ese ID" });

    // Se verífica que la reserva no se haya registrado ya como eliminada.
    if (findedBooking.dataValues.status === "Eliminado")
      return res.status(405).json({
        message:
          "Esta reserva ya se registró como eliminada. Si se trata de un error por favor comuniquese con un administrador",
      });
    // Se verífica que la reserva no se haya registrado ya como pagada.
    if (findedBooking.dataValues.status === "Pagado")
      return res.status(405).json({
        message: "Esta reserva ya se registró como pagada",
      });

    // Se cambia el estado a "Pagado".
    findedBooking.update({ status: "Pagado" });
    res.status(200).json({ message: "¡Estado cambiado con éxito!" });
  } catch {
    res
      .status(500)
      .json({ message: "El servidor no pudo procesar la solicitud" });
  }
};

const changeStatusToDeleted = async (req, res) => {
  const { id } = req.body;

  try {
    // Se encuentra una reserva con esa ID
    const findedBooking = await Booking.findOne({ where: { id } });
    if (!findedBooking)
      return res
        .status(404)
        .send({ message: "No se encontró una reserva con ese ID" });

    // Se verífica que la reserva no se haya registrado ya como pagada.
    if (findedBooking.dataValues.status === "Pagado")
      return res.status(405).json({
        message:
          "Esta reserva ya se registró como pagada. Si se trata de un error por favor comuniquese con un administrador",
      });
    // Se verífica que la reserva no se haya registrado ya como eliminada.
    if (findedBooking.dataValues.status === "Eliminado")
      return res.status(405).json({
        message: "Esta reserva ya se registró como eliminada",
      });

    // Se cambia el estado a "Eliminado".
    findedBooking.update({ status: "Eliminado" });
    res.status(200).json({ message: "¡Estado cambiado con éxito!" });
  } catch {
    res
      .status(500)
      .json({ message: "El servidor no pudo procesar la solicitud" });
  }
};

module.exports = {
  getBookings,
  getBookingsById,
  createBooking,
  changeStatusToPaid,
  changeStatusToDeleted,
};
