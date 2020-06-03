const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Modelo de MongoDB para los clientes
const clienteSchema = new Schema({
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  direccion: { type: String },
  email: { type: String, trim: true, unique: true, required: true },
  password: { type: String, trim: true, required: true },
});

module.exports = mongoose.model("Clientes", clienteSchema);
