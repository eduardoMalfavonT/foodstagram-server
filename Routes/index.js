const express = require("express");
const router = express.Router();
const clienteController = require("../Controllers/clienteController");
const productoController = require("../Controllers/productoController");
const ventasController = require("../Controllers/ventasController");
//Crear un auth para autentificacion con json web tokens
module.exports = function () {
  /*----------------------------------------Rutas--------------------------------------------------- */
  /*----------------------------------Rutas para cleintes------------------------------------------- */
  //Crear un nuevo cliente
  router.post("/cliente/nuevoCliente", clienteController.nuevoCliente);
  //Mostrar todos los clientes
  router.get("/cliente", clienteController.mostrarClientes);
  //Mostrar un solo cliente
  router.get("/cliente/:idCliente", clienteController.mostrarCliente);
  //Actualizar cliente
  router.put("/cliente/:idCliente", clienteController.actualizarCliente);
  //Eliminar un cliente
  router.delete("/cliente/:idCliente", clienteController.eliminarCliente);
  //Liga para iniciar sesion
  router.post("/login", clienteController.autenticarCliente);

  /*----------------------------------Rutas para productos----------------------------------------- */
  //Crear nuevo producto
  router.post(
    "/producto/nuevoProducto",
    productoController.subirArchivo,
    productoController.nuevoProducto
  );
  //Mostrar todos los productos
  router.get("/productos", productoController.mostrarProductos);
  //mostrar productos por categoria
  router.get(
    "/productos/:categoria",
    productoController.mostrarProductosCategoria
  );
  //Mostrar un solo producto
  router.get("/producto/:idProducto", productoController.mostrarProducto);
  //Actualizar un producto
  router.put(
    "/producto/:idProducto",
    productoController.subirArchivo,
    productoController.actualizarProducto
  );
  //Eliminar un producto
  router.delete("/producto/:idProducto", productoController.eliminarProducto);
  /*-------------------------------------Rutas para ventas-----------------------------------------*/
  //Crear una nueva venta
  router.post("/venta/nuevaVenta", ventasController.nuevaVenta);
  //Mostrar todas las ventas
  router.get("/ventas", ventasController.mostrarVentas);
  //Mostrar todas las ventas de un cliente pasando el id del cliente
  router.get("/ventas/:idCliente", ventasController.mostrarVentasDelCliene);
  //Mostrar una venta
  router.get("/venta/:idVenta", ventasController.mostrarVenta);
  //Actualizar una venta
  router.put("/venta/:idVenta", ventasController.actualizarVenta);
  //Eliminar una venta
  router.delete("/venta/:idVenta", ventasController.eliminarVenta);
  return router;
};
