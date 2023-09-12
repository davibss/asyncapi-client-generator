import fs from "fs";
require('dotenv').config();

export const BASE_DIR = process.env.BASE_DIR ?? "~/.client_generator_tmp";

export function deleteFile(path: string) {
    fs.rmSync(path);
}

export function deleteDir(path: string) {
    fs.rmSync(path, { recursive: true });
}

export function clearIOs(paths: string[]) {
    for (let singlePath of paths) {
        // fs.rmSync
    }
}

export function extractZipFileFromPath(path: string): string | undefined {
    var result = undefined;
    if (fs.lstatSync(path).isDirectory()) {
        const files = fs.readdirSync(path);
        for (let file of files) {
            if (file.endsWith(".zip")) {
                result = file;
                break;
            }
        }
    } 
    return result;
}