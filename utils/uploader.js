const multer = require("multer");

const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "../public/img");
// si no existe el archivo donde guardar la imagen se crea
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Configuración de multer para guardar archivos en carpeta pública
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploader = multer({ storage });

module.exports = uploader;
