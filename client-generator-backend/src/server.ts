import express from "express";
import { Router, Request, Response } from "express";
import { deleteFile } from "./fileHandler";
import { TemplateEnum, generateClient } from "./generateClient";
import { upload } from "./upload";

const app = express();
const route = Router();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

route.post("/generate", upload.single('asyncapispec'), async (req: Request, res: Response) => {
  const reqFile = req.file;
  var responseKey = "";
  var responseMessage = "";
  var selectedTemplate: TemplateEnum = TemplateEnum.CPP;
  selectedTemplate = req.query["template"] as TemplateEnum;
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
    if (genResponse) {
      responseKey = "message";
      responseMessage = "Client code generated!";
    } else {
      responseKey = "error";
      responseMessage = "Some error has occurred!";
    }
  } else {
    
  }

  if (req.file) {
    deleteFile(req.file?.path);
  }

  var response: {[key: string]: string} = {};
  response[responseKey] = responseMessage;
  res.json(response);
});

app.use(route);

const port = 3333;

app.listen(3333, () => {
  console.log(`App running on port ${port}`);
});
