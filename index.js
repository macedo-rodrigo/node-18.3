const express = require("express");
const { cryptoRouter } = require("./routes/crypto.routes.js");

// Conexión a la BBDD
const { connect } = require("./db.js");
connect();

// Configuración del server
const PORT = 3000;
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Rutas
const router = express.Router();
router.get("/", (req, res) => {
  res.send("THIS IS THE CRYTO API'S HOME PAGE");
});
router.get("*", (req, res) => {
  res.status(404).send("Oops! It seems like there's nothing here.");
});

// Usamos las rutas
server.use("/crypto", cryptoRouter);
server.use("/", router);

server.listen(PORT, () => {
  console.log(`The server is active on the port: ${PORT}`);
});
