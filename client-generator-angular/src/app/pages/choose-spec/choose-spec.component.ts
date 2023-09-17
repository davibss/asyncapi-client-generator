import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FileHandlerService } from 'src/app/services/file-handler.service';
import { TemplateClientGeneratorService } from 'src/app/services/template-client-generator.service';

@Component({
  selector: 'app-choose-spec',
  templateUrl: './choose-spec.component.html',
  styleUrls: ['./choose-spec.component.css']
})
export class ChooseSpecComponent implements OnInit {
  specFileContent: string = "";
  private fileReader?: FileReader;
  @ViewChild('fileUpload') fileUpload!: ElementRef<HTMLInputElement>;

  constructor(
    private fileHandlerService: FileHandlerService,
    private router: Router,
    private templateClientGenerator: TemplateClientGeneratorService
  ) {
    this.fileReader = new FileReader();
    this.fileReader.onload = (e) => {
      this.specFileContent = this.fileReader?.result?.toString() ?? "";
    };
    this.fileHandlerService
      .subscribeToSpecFile()
      .subscribe(file => this.handleFileHandlerSubscribe(file, this.fileReader));
  }

  ngOnInit(): void {
    const file = this.fileHandlerService.getSpecFile();
    const finalTemplateContent = this.templateClientGenerator.getFinalTemplateContent();
    this.specFileContent = finalTemplateContent;
    if (this.fileUpload && file && this.fileReader && finalTemplateContent === "") {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      this.fileUpload.nativeElement.files = dataTransfer.files;
      this.fileReader.readAsText(file);
    }
  }

  private handleFileHandlerSubscribe(file: File, fileReader?: FileReader) {
    if (file && fileReader) {
      fileReader.readAsText(file);
    }
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const firstFile = files[0];

    this.fileHandlerService.setSpecFile(firstFile);
  }

  handleChooseGenerator() {
    this.templateClientGenerator.setFinalTemplateContent(this.specFileContent);
    this.router.navigate(['generation', 'generator']);
  }
     
}
