const express = require("express");
const path = require("path");

const usersRouter = require("./routes/users.router");
const petsRouter = require("./routes/pets.router");

const uploader = require("./utils/uploader"); // MULTER

const exphbs = require("express-handlebars");

const app = express();
const port = 8081;

// Middlewares para interpretar json y urlencoded
app.use(express.json());
// sirve para habilitar el middleware de Express que permite interpretar datos enviados desde formularios HTML
app.use(express.urlencoded({ extended: true }));

// Middleware para archivos estáticos
app.use(express.static("./public"));
// app.use(express.static(path.join(__dirname, "public")));  //Linea para el ejercicio del formulario

// Configuración de handlebars como motor de plantillas
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));

// Rutas principales
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);

// Ruta para subida de archivos - MULTER
app.post("/upload", uploader.single("file"), (req, res) => {
  res.send("Archivo subido correctamente");
});

// EJERCICIO formulario mascota con Multer
const mascotas = []; // Lista en memoria

// Ruta para mostrar formulario HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "formulario.html"));
});
// Ruta para guardar mascota (imagen + datos)
app.post("/mascotas", uploader.single("file"), (req, res) => {
  const { nombre, tipo } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).send("❌ No se subió ninguna imagen.");
  }

  const nuevaMascota = {
    nombre,
    tipo,
    thumbnail: `/img/${file.filename}`, // Ruta pública del archivo subido
  };

  mascotas.push(nuevaMascota);
  res.status(201).json({
    mensaje: "✅ Mascota registrada correctamente",
    mascota: nuevaMascota,
  });
});

// Ruta para renderizar vista index con un usuario random
const users = [
  {
    nombre: "Ana",
    apellido: "Pérez",
    edad: 30,
    correo: "ana@mail.com",
    telefono: "123456",
  },
  {
    nombre: "Luis",
    apellido: "Gómez",
    edad: 28,
    correo: "luis@mail.com",
    telefono: "654321",
  },
  {
    nombre: "Sofía",
    apellido: "Rodríguez",
    edad: 25,
    correo: "sofia@mail.com",
    telefono: "789123",
  },
];

app.get("/", (req, res) => {
  const randomUser = users[Math.floor(Math.random() * users.length)];
  res.render("index", randomUser);
});

// Datos de ejemplo
const food = [
  { name: "Hamburguesa", price: 100 },
  { name: "Banana", price: 20 },
  { name: "Soda", price: 40 },
  { name: "Ensalada", price: 120 },
  { name: "Pizza", price: 150 },
];
app.get("/dato-dinamico", (req, res) => {
  let testUser = {
    name: "Hilda",
    last_name: "Martinez",
    role: "admin", // cambiar a "user" para probar el otro caso
  };

  res.render("dinamico", {
    user: testUser,
    isAdmin: testUser.role === "admin",
    food,
  });
});

//ULTIMO EJERCICIO handlebars
const usuarios = []; // Simulación de base de datos en memoria
app.get("/register", (req, res) => {
  res.render("register");
});
//envio formulario
app.post("/user", (req, res) => {
  const { nombre, correo, password } = req.body;

  if (!nombre || !correo || !password) {
    return res.status(400).send("Todos los campos son obligatorios.");
  }

  usuarios.push({ nombre, correo, password });

  res.send(`✅ Usuario ${nombre} registrado con éxito`);
});
//ver usuarios
app.get("/users", (req, res) => {
  res.render("users", { usuarios });
});
// VER DESDE NAVEGADOR
// app.get("/api/users", (req, res) => {
//   res.json(usuarios);
// });

// Servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
