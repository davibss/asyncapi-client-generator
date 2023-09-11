import fs from "fs";

export const BASE_DIR = process.env.BASE_DIR ?? "/home/api-generator/.client_generator_tmp";

export function deleteFile(path: string) {
    fs.rmSync(path);
}

export function clearIOs(paths: string[]) {
    for (let singlePath of paths) {
        // fs.rmSync
    }
}