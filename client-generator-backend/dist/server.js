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
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const fileHandler_1 = require("./fileHandler");
const generateClient_1 = require("./generateClient");
const upload_1 = require("./upload");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const route = (0, express_2.Router)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
route.get("/", (req, res) => {
    res.send("Express backend to generate client code from AsyncAPI specification");
});
route.post("/generate", upload_1.upload.single('asyncapispec'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const reqFile = req.file;
    var responseKey = "";
    var responseMessage;
    var selectedTemplate = "CPP";
    selectedTemplate = req.query["template"];
    var params;
    try {
        params = JSON.parse(req.query["params"] !== undefined ? req.query["params"] : "{}");
    }
    catch (e) {
        responseKey = "error";
        responseMessage = "The value passed to 'params' is not a valid JSON";
    }
    if (selectedTemplate === undefined) {
        responseKey = "error";
        responseMessage = "This template does not exist. The valid template are CPP and ANGULAR";
    }
    if (selectedTemplate && responseKey !== "error") {
        const genResponse = yield (0, generateClient_1.generateClient)(reqFile, selectedTemplate, params);
        if (genResponse !== undefined) {
            responseKey = "message";
            responseMessage = {
                "message": "Client code generated!",
                "ID": genResponse
            };
        }
        else {
            responseKey = "error";
            responseMessage = "Some error has occurred!";
        }
    }
    else {
    }
    if (req.file) {
        (0, fileHandler_1.deleteFile)((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
    }
    var response = {};
    response[responseKey] = responseMessage;
    res.json(response);
}));
route.get("/download_client/:id", (req, res) => {
    const filePath = path_1.default.join(fileHandler_1.BASE_DIR, "output", req.params.id);
    const zipFile = (0, fileHandler_1.extractZipFileFromPath)(filePath);
    if (zipFile) {
        res.download(path_1.default.join(filePath, zipFile), (err) => {
            if (err === undefined) {
                (0, fileHandler_1.deleteDir)(filePath);
            }
        });
    }
});
route.get("/ping", (req, res) => {
    res.json({ "message": "PONG" });
});
app.use(route);
const port = process.env.PORT || 3333;
app.listen(3333, () => {
    console.log(`App running on port ${port}`);
});
//# sourceMappingURL=server.js.map