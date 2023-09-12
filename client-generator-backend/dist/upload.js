"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fileHandler_1 = require("./fileHandler");
require('dotenv').config();
// Set up storage for uploaded files
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        if (!fs_1.default.existsSync(fileHandler_1.BASE_DIR)) {
            fs_1.default.mkdirSync(fileHandler_1.BASE_DIR);
        }
        const uploadPath = path_1.default.join(fileHandler_1.BASE_DIR, 'uploads');
        if (!fs_1.default.existsSync(uploadPath)) {
            fs_1.default.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
// Create the multer instance
exports.upload = (0, multer_1.default)({ storage: storage });
//# sourceMappingURL=upload.js.map