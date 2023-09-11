const Generator = require("@asyncapi/generator");
import path from "path";
import { BASE_DIR, clearIOs, renameFile } from "./fileHandler";
import { TemplateType, templates } from "./templateModel";
import crypto from "crypto";

require('dotenv').config();

async function generateClient(
    specFile: Express.Multer.File | undefined, 
    template: TemplateType,
    params: {[key: string]: string}
): Promise<string | undefined> {
    var result: string | undefined = undefined;

    const choosedTemplate = templates[template];
    const generator = new Generator(
        choosedTemplate.link, 
        path.resolve(choosedTemplate.output), 
        {
            forceWrite: true,
            templateParams: params
        }
    );

    try {
        if (specFile) {
            await generator.generateFromFile(specFile.path);
            const fileID = crypto.randomUUID();
            const filePath = path.join(templates[template].output, `asyncapi_${template.toLowerCase()}_client.zip`);
            const newFilePath = filePath.replace(`asyncapi_${template.toLowerCase()}_client.zip`, `${fileID}.zip`);
            renameFile(filePath, newFilePath);
            result = fileID;
            clearIOs([specFile.path, choosedTemplate.output]);
        }
    } catch (e) {
        console.error(e);
    }

    return result;
}

export {
    generateClient
};