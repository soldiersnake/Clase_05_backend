
const multer = require("multer");

// Configuración de multer para guardar archivos en carpeta pública
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const uploader = multer({ storage });

module.exports = uploader;
