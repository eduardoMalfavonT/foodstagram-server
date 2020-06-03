const Ventas = require("../Models/Ventas"); //Crear el modelo para ventas

//Crea una nueva venta
exports.nuevaVenta = async (req, res, next) => {
  const venta = new Ventas(req.body);
  try {
    await venta.save();
    res.json({ mensaje: "La venta se a realizado satisfactoriamente" });
  } catch (error) {
    console.log(error);
    res.json(error);
    next();
  }
};

//Mostrar todas las ventas
exports.mostrarVentas = async (req, res, next) => {
  try {
    const ventas = await Ventas.find({})
      .populate("usuario", { password: 0 })
      .populate({ path: "carrito.producto", model: "Productos" });
    res.json(ventas);
  } catch (error) {
    console.log(error);
    res.json({ mensaje: "Hubo un error al mostrar las ventas" });
    next();
  }
};

//Mostrar una venta mediante su id
exports.mostrarVenta = async (req, res, next) => {
  try {
    const venta = await Ventas.findById({
      _id: req.params.idVenta,
    })
      .populate("usuario", { password: 0 })
      .populate({ path: "carrito.producto", model: "Productos" });
    if (!venta) {
      res.json({ mensaje: "Esa venta no existe" });
      return next();
    }
    res.json(venta);
  } catch (error) {
    console.log(error);
    res.json({ mensaje: "Hubo un error al mostrar la venta" });
    next();
  }
};

//Actualizar una venta mediante su id
exports.actualizarVenta = async (req, res, next) => {
  try {
    const venta = await Ventas.findOneAndUpdate(
      { _id: req.params.idVenta },
      req.body,
      { new: true }
    )
      .populate("usuario")
      .populate({ path: "carrito.producto", model: "Productos" });
    res.json(venta);
  } catch (error) {
    console.log(error);
    res.json({ mensaje: "Hubo un error al actualizar la venta" });
    next();
  }
};

//Eliminar una venta mediante su id
exports.eliminarVenta = async (req, res, next) => {
  try {
    await Ventas.findOneAndDelete({ _id: req.params.idVenta });
    res.json({ mensaje: "La venta se a eliminado exitosamente" });
  } catch (error) {
    console.log(error);
    res.json({ mensaje: "Hubo un error al eliminar la venta" });
    next();
  }
};
