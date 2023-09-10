import { Injectable } from '@angular/core';
import { FileHandlerService } from './file-handler.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateClientGeneratorService {

  constructor(private fileHandlerService: FileHandlerService) { }

  private async generateFromSpecFile() {
  }

  generateClient() {
    const specInput = this.fileHandlerService.getSpecFile();
    if (specInput) {
     this.generateFromSpecFile();
    }
  }
}
