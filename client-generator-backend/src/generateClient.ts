const generator = require("@asyncapi/generator");
import path from "path";
import { TemplateType, templates } from "./templateModel";
import crypto from "crypto";
import { File } from "buffer";
import { spec } from "node:test/reporters";
import multer from "multer";

async function generateClientFromString(
    specContent: string | undefined,
    template: TemplateType,
    params: {[key: string]: string}
): Promise<string | undefined> {
    return generateClient(specContent, template, params);
}

async function generateClient(
    specFile: Express.Multer.File | string | undefined, 
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
            result = fileID;
            if (typeof specFile === "string") {
                const _ = await generatorInstance.generateFromString(specFile);
            } else {
                const _ = await generatorInstance.generateFromFile((specFile as Express.Multer.File).path);
            }
        }
    } catch (e) {
        console.error(e);
        return undefined;
    }

    return result;
}

export {
    generateClientFromString,
    generateClient
};