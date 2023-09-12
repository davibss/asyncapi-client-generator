"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateClient = void 0;
const generator = require("@asyncapi/generator");
const path_1 = __importDefault(require("path"));
const fileHandler_1 = require("./fileHandler");
const templateModel_1 = require("./templateModel");
const crypto_1 = __importDefault(require("crypto"));
function generateClient(specFile, template, params) {
    return __awaiter(this, void 0, void 0, function* () {
        var result = undefined;
        const fileID = crypto_1.default.randomUUID();
        const choosedTemplate = templateModel_1.templates[template];
        const templateOutput = path_1.default.join(choosedTemplate.output, fileID);
        const generatorInstance = new generator(choosedTemplate.link, path_1.default.resolve(templateOutput), {
            forceWrite: true,
            templateParams: params
        });
        try {
            if (specFile) {
                yield generatorInstance.generateFromFile(specFile.path);
                result = fileID;
                (0, fileHandler_1.clearIOs)([specFile.path, choosedTemplate.output]);
            }
        }
        catch (e) {
            console.error(e);
        }
        return result;
    });
}
exports.generateClient = generateClient;
//# sourceMappingURL=generateClient.js.map