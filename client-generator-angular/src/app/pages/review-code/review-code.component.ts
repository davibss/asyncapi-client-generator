import { Component, OnInit } from '@angular/core';
import { FileHandlerService } from 'src/app/services/file-handler.service';
import * as JSZip from 'jszip';
import { Ace, edit, config } from 'ace-builds';
import { getModeForPath } from "ace-builds/src-noconflict/ext-modelist";

@Component({
  selector: 'app-review-code',
  templateUrl: './review-code.component.html',
  styleUrls: ['./review-code.component.css']
})
export class ReviewCodeComponent implements OnInit {

  files: JSZip.JSZipObject[] = [];

  selectedFileContent: string = "";
  selectedMode: string = "json";

  constructor(private fileHandlerService: FileHandlerService) {
    this.fileHandlerService.generatedFiles.subscribe(jsZipFiles => {
      this.files = jsZipFiles;
    })
  }

  ngOnInit(): void {
  }

  async handleOnClickFile(file: JSZip.JSZipObject) {
    this.selectedFileContent = await file.async("string");
    var filePath = file.name;
    this.selectedMode = getModeForPath(filePath).mode;
    console.log(this.selectedMode);
  }

}
