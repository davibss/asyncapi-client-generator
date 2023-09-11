import multer from "multer";
import fs from "fs";
import path from 'path';
import { BASE_DIR } from "./fileHandler";
require('dotenv').config();

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(BASE_DIR)) {
      fs.mkdirSync(BASE_DIR);
    }
    const uploadPath = path.join(BASE_DIR, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create the multer instance
export const upload = multer({ storage: storage });
