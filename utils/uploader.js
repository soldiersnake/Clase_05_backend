// Requiere el middleware Multer para manejo de archivos
const multer = require("multer");

// Módulos nativos de Node.js para trabajar con el sistema de archivos y rutas
const fs = require("fs");
const path = require("path");

// Ruta absoluta donde se guardarán las imágenes
const dir = path.join(__dirname, "../public/img");

// Verifica si la carpeta donde se guardarán las imágenes no existe
if (!fs.existsSync(dir)) {
  // Si no existe, la crea (incluso si hay subcarpetas faltantes gracias a { recursive: true })
  fs.mkdirSync(dir, { recursive: true });
}

// Configuración del almacenamiento para Multer
const storage = multer.diskStorage({
  // Define la carpeta de destino donde guardar los archivos subidos
  destination: function (req, file, cb) {
    // cb = callback; el primer parámetro es el error (null en este caso), el segundo es la ruta
    cb(null, "./public/img");
  },
  // Define el nombre del archivo que se guardará
  filename: function (req, file, cb) {
    // Se le agrega un timestamp para evitar nombres duplicados
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Se crea el middleware 'uploader' usando la configuración definida
const uploader = multer({ storage });

// Exportamos el middleware para poder usarlo en otras partes del proyecto (como app.js)
module.exports = uploader;
