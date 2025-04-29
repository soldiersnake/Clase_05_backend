const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const usersRouter = require("./routes/users.router");
const petsRouter = require("./routes/pets.router");
const uploader = require("./utils/uploader");

const app = express();
const port = 8080;

// Middlewares para interpretar json y urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para archivos estáticos
app.use(express.static("./public"));

// Configuración de handlebars como motor de plantillas
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));

// Rutas principales
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);

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

// Ruta para subida de archivos
app.post("/upload", uploader.single("file"), (req, res) => {
  res.send("Archivo subido correctamente");
});

// Servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
