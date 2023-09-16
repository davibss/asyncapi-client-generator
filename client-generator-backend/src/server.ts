import express from "express";
import { Router, Request, Response } from "express";
import { BASE_DIR, deleteDir, deleteFile, extractZipFileFromPath } from "./fileHandler";
import { generateClient, generateClientFromString } from "./generateClient";
import { upload } from "./upload";
import path from "path";
import { TemplateType, templates } from "./templateModel";
import multer from "multer";
import cors from "cors";

const uploadMulter = multer();

const app = express();
const route = Router();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(cors({
//   origin: "http://localhost:4200",
//   optionsSuccessStatus: 200
// }));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

route.get("/", (req: Request, res: Response) => {
  res.send("Express backend to generate client code from AsyncAPI specification");
});

route.post("/api/generate_from_string", uploadMulter.none(), async (req: Request, res: Response) => {
  var responseKey = "";
  var responseMessage: any;
  var selectedTemplate: TemplateType = "CPP";
  selectedTemplate = req.query["template"] as TemplateType;
  var params;

  try {
    params = JSON.parse(req.query["params"] !== undefined ? req.query["params"] as string : "{}");
  } catch(e) {
    responseKey = "error";
    responseMessage = "The value passed to 'params' is not a valid JSON";
  }

  if (selectedTemplate === undefined) {
    responseKey = "error";
    responseMessage = "This template does not exist. The valid template are CPP and ANGULAR";
  }

  if (selectedTemplate && responseKey !== "error") {
    const genResponse = await generateClientFromString(req.body.asyncapispec, selectedTemplate, params);
    if (genResponse !== undefined) {
      responseKey = "message";
      responseMessage = {
        "message": "Client code generated!",
        "ID": genResponse
      };
    } else {
      responseKey = "error";
      responseMessage = "Some error has occurred!";
    }
  }
  
  var response: {[key: string]: any} = {};
  response[responseKey] = responseMessage;
  res.json(response);
});

route.post("/api/generate", upload.single('asyncapispec'), async (req: Request, res: Response) => {
  const reqFile = req.file;
  var responseKey = "";
  var responseMessage: any;
  var selectedTemplate: TemplateType = "CPP";
  selectedTemplate = req.query["template"] as TemplateType;
  var params;

  try {
    params = JSON.parse(req.query["params"] !== undefined ? req.query["params"] as string : "{}");
  } catch(e) {
    responseKey = "error";
    responseMessage = "The value passed to 'params' is not a valid JSON";
  }

  if (selectedTemplate === undefined) {
    responseKey = "error";
    responseMessage = "This template does not exist. The valid template are CPP and ANGULAR";
  }

  if (selectedTemplate && responseKey !== "error") {
    const genResponse = await generateClient(reqFile, selectedTemplate, params);
    if (genResponse !== undefined) {
      responseKey = "message";
      responseMessage = {
        "message": "Client code generated!",
        "ID": genResponse
      };
    } else {
      responseKey = "error";
      responseMessage = "Some error has occurred!";
    }
  }

  if (req.file) {
    deleteFile(req.file?.path);
  }
  
  var response: {[key: string]: any} = {};
  response[responseKey] = responseMessage;
  res.json(response);
});

route.get("/api/download_client/:id", (req: Request, res: Response) => {
  const filePath = path.join(BASE_DIR, "output", req.params.id);
  const zipFile = extractZipFileFromPath(filePath);
  if (zipFile) {
    res.download(path.join(filePath, zipFile), (err) => {
      if (err === undefined) {
        deleteDir(filePath);
      }
    });
  }
});

route.get("/api/ping", (req: Request, res: Response) => {
  res.json({"message": "PONG"});
});

app.use(route);

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
