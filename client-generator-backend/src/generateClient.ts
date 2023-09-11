const Generator = require("@asyncapi/generator");
import path from "path";
import { BASE_DIR, clearIOs } from "./fileHandler";

require('dotenv').config();

export enum TemplateEnum {
    CPP = "CPP",
    ANGULAR = "ANGULAR"
}
const templates: {[key in TemplateEnum]: {name: string, link: string, params: string[], output: string}} = {
    CPP: {
        name: "CPlusPlusTemplate",
        link: "./node_modules/cpp-template",
        params: [],
        output: path.join(BASE_DIR, "output/cplusplusoutput")
    },
    ANGULAR: {
        name: "AngularTemplate",
        link: "./node_modules/angular-template",
        params: [],
        output: path.join(BASE_DIR, "output/angularoutput")
    }
};

async function generateClient(
    specFile: Express.Multer.File | undefined, 
    template: TemplateEnum,
    params: {[key: string]: string}
): Promise<boolean> {
    var result = false;

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
            console.log('Done!');
            result = true;
            clearIOs([specFile.path, choosedTemplate.output]);
        }
    } catch (e) {
        console.error(e);
        result = false;
    }

    return result;
}

export {
    generateClient
};