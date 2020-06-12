const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Modelo para MongoDB de ventas
const ventasSchema = new Schema({
  cliente: { type: Schema.ObjectId, ref: "Clientes" },
  carrito: [
    {
      producto: { type: Schema.ObjectId, ref: "Productos" },
      cantidad: { type: Number },
    },
  ],
  testimado: { type: String },
  total: { type: Number },
});

module.exports = mongoose.model("Ventas", ventasSchema);
