"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractZipFileFromPath = exports.clearIOs = exports.deleteDir = exports.deleteFile = exports.BASE_DIR = void 0;
const fs_1 = __importDefault(require("fs"));
require('dotenv').config();
exports.BASE_DIR = (_a = process.env.BASE_DIR) !== null && _a !== void 0 ? _a : "~/.client_generator_tmp";
function deleteFile(path) {
    fs_1.default.rmSync(path);
}
exports.deleteFile = deleteFile;
function deleteDir(path) {
    fs_1.default.rmSync(path, { recursive: true });
}
exports.deleteDir = deleteDir;
function clearIOs(paths) {
    for (let singlePath of paths) {
        // fs.rmSync
    }
}
exports.clearIOs = clearIOs;
function extractZipFileFromPath(path) {
    var result = undefined;
    if (fs_1.default.lstatSync(path).isDirectory()) {
        const files = fs_1.default.readdirSync(path);
        for (let file of files) {
            if (file.endsWith(".zip")) {
                result = file;
                break;
            }
        }
    }
    return result;
}
exports.extractZipFileFromPath = extractZipFileFromPath;
//# sourceMappingURL=fileHandler.js.map