
const express = require("express");
const router = express.Router();

const pets = [];

// Ruta GET para listar mascotas
router.get("/", (req, res) => {
  res.json({ pets });
});

// Ruta POST para agregar una nueva mascota
router.post("/", (req, res) => {
  const pet = req.body;
  pets.push(pet);
  res.status(201).json({ message: "Mascota agregada", pet });
});

module.exports = router;
