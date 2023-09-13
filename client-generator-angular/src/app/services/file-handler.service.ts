import { Injectable } from '@angular/core';
import { Observable, Subject, Subscribable, of, zip } from 'rxjs';
import * as JSZip from 'jszip';
// import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FileHandlerService {

  private specFile: File | undefined;
  private specFileSubject = new Subject<File>;

  private generatedZipFile: File | undefined;
  generatedFiles = new Subject<JSZip.JSZipObject[]>;

  constructor() { }

  setSpecFile(file: File) {
    this.specFile = file;
    this.specFileSubject.next(file);
  }

  getSpecFile() {
    return this.specFile;
  }

  subscribeToSpecFile(): Subject<File> {
    return this.specFileSubject;
  }

  setGeneratedZipFile(zipFile: File) { 
    this.generatedZipFile = zipFile;
  }

  getGeneratedZipFile() {
    return this.generatedZipFile;
  }

  getGeneratedFiles() {
    return this.generatedFiles;
  }

  async extractZip(file: File) {
    const zip = new JSZip();
    const extractedFiles = await zip.loadAsync(file);
    var files: JSZip.JSZipObject[] = [];
    extractedFiles.forEach((relativePath, file) => {
      if (!file.dir) {
        files.push(file);
      }
    })
    this.generatedFiles.next(files);
  }

  downLoadFile(data: any, type: string, filename: string) {
    var blob = new Blob([data], { type: type.toString() });
    var url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
