import { Injectable } from '@angular/core';
import { Observable, Subject, Subscribable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileHandlerService {

  private specFile: File | undefined;
  private specFileSubject = new Subject<File>;

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

}
