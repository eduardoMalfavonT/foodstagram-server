const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //Autorizacion por medio del header
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("No autenticado, no hay jwt");
    error.statusCode = 401;
    throw error;
  }
  //Obtenemos el token y verificarlo
  const token = authHeader.split(" ")[1];
  //Verificamos que el token sea valido
  let revisarToken;
  try {
    revisarToken = jwt.verify(token, "LLAVESECRETA");
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
  //Si es un token valido pero hay algun error
  if (!revisarToken) {
    const error = new Error("No autenticado");
    error.statusCode = 401;
    throw error;
  }
  next();
};
