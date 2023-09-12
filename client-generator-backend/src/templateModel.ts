import path from "path";
import { BASE_DIR } from "./fileHandler";

export type TemplateType = "ANGULAR" | "CPP";

export const templates: {[key in TemplateType]: {name: string, link: string, params: string[], output: string}} = {
    "CPP": {
        name: "CPlusPlusTemplate",
        link: "./node_modules/cpp-template",
        params: [],
        output: path.join(BASE_DIR, "output")
    },
    "ANGULAR": {
        name: "AngularTemplate",
        link: "./node_modules/angular-template",
        params: [],
        output: path.join(BASE_DIR, "output")
    }
};