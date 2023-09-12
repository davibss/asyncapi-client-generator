import express from "express";
import { Router, Request, Response } from "express";
import { BASE_DIR, deleteDir, deleteFile, extractZipFileFromPath } from "./fileHandler";
import { generateClient } from "./generateClient";
import { upload } from "./upload";
import path from "path";
import { TemplateType, templates } from "./templateModel";

const app = express();
const route = Router();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

route.get("/", (req: Request, res: Response) => {
  res.send("Express backend to generate client code from AsyncAPI specification");
});

route.post("/generate", upload.single('asyncapispec'), async (req: Request, res: Response) => {
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
  } else {
    
  }

  if (req.file) {
    deleteFile(req.file?.path);
  }

  
  var response: {[key: string]: any} = {};
  response[responseKey] = responseMessage;
  res.json(response);
});

route.get("/download_client/:id", (req: Request, res: Response) => {
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

route.get("/ping", (req: Request, res: Response) => {
  res.json({"message": "PONG"});
});

app.use(route);

const port = process.env.PORT || 3333;

app.listen(3333, () => {
  console.log(`App running on port ${port}`);
});
