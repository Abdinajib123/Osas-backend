// utils/multerUtility.js

import multer from 'multer';
import path from 'path';

// Define file storage configuration for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the directory for storing images
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Define how the uploaded file's name will be created
    cb(null, Date.now() + path.extname(file.originalname)); // Use current timestamp to avoid name conflicts
  },
});

// Multer instance with the storage configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Max file size (5MB)
  },
  fileFilter: (req, file, cb) => {
    // Allow only image files (JPG, JPEG, PNG, GIF)
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  },
});

export default upload;
