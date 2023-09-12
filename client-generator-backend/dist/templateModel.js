"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.templates = void 0;
const path_1 = __importDefault(require("path"));
const fileHandler_1 = require("./fileHandler");
exports.templates = {
    "CPP": {
        name: "CPlusPlusTemplate",
        link: "./node_modules/cpp-template",
        params: [],
        output: path_1.default.join(fileHandler_1.BASE_DIR, "output")
    },
    "ANGULAR": {
        name: "AngularTemplate",
        link: "./node_modules/angular-template",
        params: [],
        output: path_1.default.join(fileHandler_1.BASE_DIR, "output")
    }
};
//# sourceMappingURL=templateModel.js.map