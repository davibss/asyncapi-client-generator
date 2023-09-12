const generator = require("@asyncapi/generator");
import path from "path";
import { clearIOs } from "./fileHandler";
import { TemplateType, templates } from "./templateModel";
import crypto from "crypto";

async function generateClient(
    specFile: Express.Multer.File | undefined, 
    template: TemplateType,
    params: {[key: string]: string}
): Promise<string | undefined> {
    var result: string | undefined = undefined;
    const fileID = crypto.randomUUID();
    const choosedTemplate = templates[template];

    const templateOutput = path.join(choosedTemplate.output, fileID);

    const generatorInstance = new generator(
        choosedTemplate.link, 
        path.resolve(templateOutput), 
        {
            forceWrite: true,
            templateParams: params
        }
    );

    try {
        if (specFile) {
            await generatorInstance.generateFromFile(specFile.path);
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