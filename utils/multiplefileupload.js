import multer from "multer";
import path from "path";

// Set storage engine
const storage = multer.diskStorage({
  destination: "./Files/",
  filename: function (req, file, cb) {
    const date = new Date().toISOString().replace(/:/g, "-"); // More robust timestamp
    const originalName = path.basename(
      file.originalname,
      path.extname(file.originalname)
    );
    cb(null, `${originalName}-${date}${path.extname(file.originalname)}`);
  },
});

// Check file type
function checkFileType(file, cb) {
  // Allowed extensions and MIME types
  const filetypes = /\.(pdf|docx)$/i;
  const mimetypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check MIME type
  const mimetype = mimetypes.includes(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error("Error: Only PDF and DOCX files are allowed!"));
  }
}

// Initialize upload
const Upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb); 
  },
}).array("documents", 5); // Ensure the field name matches frontend request

export default Upload;
