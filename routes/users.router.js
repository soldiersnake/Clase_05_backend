
const express = require("express");
const router = express.Router();

const users = [];

// Ruta GET para listar usuarios
router.get("/", (req, res) => {
  res.json({ users });
});

// Ruta POST para agregar un nuevo usuario
router.post("/", (req, res) => {
  const user = req.body;
  users.push(user);
  res.status(201).json({ message: "Usuario agregado", user });
});

module.exports = router;
