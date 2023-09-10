import { Component } from '@angular/core';
import { FileHandlerService } from 'src/app/services/file-handler.service';
import { TemplateClientGeneratorService } from 'src/app/services/template-client-generator.service';

@Component({
  selector: 'app-choose-spec',
  templateUrl: './choose-spec.component.html',
  styleUrls: ['./choose-spec.component.css']
})
export class ChooseSpecComponent {
  specFileContent: string;
  private fileReader;

  private handleFileHandlerSubscribe(file: File, fileReader: FileReader) {
    if (file) {
      fileReader.readAsText(file);
    }
  }

  constructor(
    private fileHandlerService: FileHandlerService,
    private templateClientGenerator: TemplateClientGeneratorService
  ) {
    this.specFileContent = "No content yet";
    this.fileReader = new FileReader();
    this.fileReader.onload = (e) => {
      this.specFileContent = this.fileReader.result?.toString() ?? "";
    };
    fileHandlerService.subscribeToSpecFile().subscribe(file => this.handleFileHandlerSubscribe(file, this.fileReader));
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const firstFile = files[0];

    this.fileHandlerService.setSpecFile(firstFile);
  }

  handleGeneration() {
    this.templateClientGenerator.generateClient();
  }    
}
