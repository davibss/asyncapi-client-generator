import fs from "fs";

export function deleteFile(path: string) {
    fs.rmSync(path);
}

export function clearIOs(paths: string[]) {
    for (let singlePath of paths) {
        // fs.rmSync
    }
}