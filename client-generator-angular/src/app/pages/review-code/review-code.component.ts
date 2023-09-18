import { Component, OnInit } from '@angular/core';
import { FileHandlerService } from 'src/app/services/file-handler.service';
import * as JSZip from 'jszip';
import { Ace, edit, config } from 'ace-builds';
import { getModeForPath } from "ace-builds/src-noconflict/ext-modelist";
import { take } from 'rxjs';

@Component({
  selector: 'app-review-code',
  templateUrl: './review-code.component.html',
  styleUrls: ['./review-code.component.css']
})
export class ReviewCodeComponent implements OnInit {
  files: JSZip.JSZipObject[] = [];
  selectedFileContent: string = "";
  selectedMode: string = "json";

  constructor(private fileHandlerService: FileHandlerService) {}

  ngOnInit(): void {
    this.fileHandlerService.generatedFiles.subscribe(jsZipFiles => {
      this.files = jsZipFiles;
    });
    const zipFile = this.fileHandlerService.getGeneratedZipFile();
    if (zipFile) {
      this.fileHandlerService.extractZip(zipFile);
    }
  }

  async handleOnClickFile(file: JSZip.JSZipObject) {
    this.selectedFileContent = await file.async("string");
    this.selectedMode = getModeForPath(file.name).mode;
  }

  async handleDownloadButton() {
    const zipFile = this.fileHandlerService.getGeneratedZipFile();
    const data = await zipFile?.arrayBuffer();
    this.fileHandlerService.downLoadFile(data, 'application/zip', "generated_code.zip");
  }

}
