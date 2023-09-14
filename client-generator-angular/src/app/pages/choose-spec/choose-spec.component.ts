import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FileHandlerService } from 'src/app/services/file-handler.service';
import { TemplateClientGeneratorService } from 'src/app/services/template-client-generator.service';

@Component({
  selector: 'app-choose-spec',
  templateUrl: './choose-spec.component.html',
  styleUrls: ['./choose-spec.component.css']
})
export class ChooseSpecComponent implements AfterViewInit {
  specFileContent: string;
  private fileReader;
  @ViewChild('fileUpload') fileUpload!: ElementRef<HTMLInputElement>;

  private handleFileHandlerSubscribe(file: File, fileReader: FileReader) {
    if (file) {
      fileReader.readAsText(file);
    }
  }

  constructor(
    private fileHandlerService: FileHandlerService,
    private templateClientGenerator: TemplateClientGeneratorService,
    private router: Router
  ) {
    this.specFileContent = "No content yet";
    this.fileReader = new FileReader();
    this.fileReader.onload = (e) => {
      this.specFileContent = this.fileReader.result?.toString() ?? "";
    };
    fileHandlerService.subscribeToSpecFile().subscribe(file => this.handleFileHandlerSubscribe(file, this.fileReader));
  }

  ngAfterViewInit(): void {
    const file = this.fileHandlerService.getSpecFile();
    if (this.fileUpload && file && this.fileReader) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      this.fileUpload.nativeElement.files = dataTransfer.files;
      this.fileReader.readAsText(file);
    }
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const firstFile = files[0];

    this.fileHandlerService.setSpecFile(firstFile);
  }

  handleChooseGenerator() {
    this.router.navigate(['generation', 'generator']);
  }
     
}
