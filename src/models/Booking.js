const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "booking",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      status: {
        type: DataTypes.ENUM("Pendiente", "Pagado", "Eliminado"),
        defaultValue: "Pendiente",
      },
      roomDetails: {
        type: DataTypes.STRING(510),
        allowNull: false,
      },
      checkIn: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      checkOut: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      billingDetails: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      paymentMethod: {
        type: DataTypes.ENUM(
          "Mastercard",
          "Visa",
          "Efectivo",
          "Transferencia bancaria"
        ),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
