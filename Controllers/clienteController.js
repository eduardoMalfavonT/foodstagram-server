const Clientes = require("../Models/Clientes"); //crear el modelo para clientes
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Crear nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
  const cliente = new Clientes(req.body);
  cliente.password = await bcrypt.hash(req.body.password, 12);
  try {
    await cliente.save();
    res.json({ mensje: "El cliente fue creado exitosamente" });
  } catch (error) {
    console.log(error);
    res.json({ mensaje: "Hubo un error al crear el cliente" });
  }
};
//Mostrar todos los clientes
exports.mostrarClientes = async (req, res, next) => {
  try {
    const clientes = await Clientes.find({}, { password: 0 });
    res.json(clientes);
  } catch (error) {
    console.log(error);
    next();
  }
};
//Mostrar un solo cliente mediante su id
exports.mostrarCliente = async (req, res, next) => {
  try {
    const cliente = await Clientes.findById(req.params.idCliente, {
      password: 0,
    });
    if (!cliente) {
      res.json({
        mensaje: "El cliente no existe en la base de datos intente de nuevo",
      });
      return next();
    }
    res.json(cliente);
  } catch (error) {
    res.json({ mensaje: "Hubo un error al buscar el cliente" });
  }
};
//Actualizar un cliente mediante du id
exports.actualizarCliente = async (req, res, next) => {
  try {
    const cliente = await Clientes.findOneAndUpdate(
      { _id: req.params.idCliente },
      req.body,
      { new: true }
    );
    res.json(cliente);
  } catch (error) {
    console.log(error);
    res.json(error);
    next();
  }
};
//Eliminar un cliente mediante su id
exports.eliminarCliente = async (req, res, next) => {
  try {
    await Clientes.findOneAndDelete({ _id: req.params.idCliente });
    res.json({ mensaje: "El cliente se ha eliminado satisfactoriamente" });
  } catch (error) {
    console.log(error);
    res.json(error);
    next();
  }
};
//Para la autenticacion del cliente
exports.autenticarCliente = async (req, res, next) => {
  const { email, password } = req.body;
  const cliente = await Clientes.findOne({ email });
  if (!cliente) {
    await res.status(401).json({
      mensaje: "Ese cliente no existe en la base de datos ",
      problem: "Puede ser que su correo o contraseña no sean los correctos",
    });
    next();
  } else {
    if (!bcrypt.compareSync(password, cliente.password)) {
      await res.status(401).json({
        mensaje: "Password incorrecto intentelo de nuevo",
      });
      next();
    } else {
      const token = jwt.sign(
        {
          email: cliente.email,
          nombre: usuario.nombre,
          _id: usuario._id,
        },
        "LLAVESECRETA",
        {
          expiresIn: "2h",
        }
      );
      res.json({ token, id: cliente._id });
    }
  }
};
