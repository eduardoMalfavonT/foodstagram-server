const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Modelo para ModngoDB para productos
const productosSchema = new Schema({
  nombre: { type: String },
  precio: { type: Number, trim: true },
  ingrediantes: [{ type: String }],
  categoria: { type: String },
  direccion: { type: String },
  imagen: { type: String },
});

module.exports = mongoose.model("Productos", productosSchema);