import { Injectable } from '@angular/core';
import { FileHandlerService } from './file-handler.service';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';

interface GenerateCodeResponse {
  message: {
    message: string;
    ID: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class TemplateClientGeneratorService {

  // private baseURL = 'https://asyncapi-client-generator.vercel.app';
  private finalTemplateContent = "";

  constructor(
    private fileHandlerService: FileHandlerService, 
    private http: HttpClient,
    private router: Router
  ) { }

  getFinalTemplateContent() {
    return this.finalTemplateContent;
  }

  setFinalTemplateContent(content: string) {
    this.finalTemplateContent = content;
  }

  private handleGenerateCodeResponse(response: GenerateCodeResponse) {
    console.log("Code Generated. Downloading file...");
    setTimeout(() => {
      const generateId = response.message.ID;
      this.http
        .get(`/api/download_client/${generateId}`, {
          responseType: "arraybuffer"
        })
        .subscribe(response => {
          try {
            var blob = new Blob([response], { type: 'application/zip' });
            const file = new File([blob], "generated_code.zip");
            this.fileHandlerService.setGeneratedZipFile(file);
            this.fileHandlerService.extractZip(file);
            this.router.navigate(['generation', 'review']);
            console.log("File downloaded");
          } catch(err) {
            window.alert("some error occurred!");
          }
        });
    }, 1000);
  }

  private async generateFromSpecFile(specFile: File, templateLanguage: string = "CPP") {  
    const formData = new FormData();
    formData.append("asyncapispec", specFile);
    console.log("Generating code...")
    this.http
      .post(`/api/generate`, 
        formData,
        {
          params: {
            "template": templateLanguage,
            "params": `{"zip": "true"}`
          }
        }
      )
      .subscribe(response => this.handleGenerateCodeResponse(response as GenerateCodeResponse));
  }

  private async generateFromSpecString(templateContent: string, templateLanguage: string = "CPP") {  
    const formData = new FormData();
    formData.append("asyncapispec", templateContent);
    console.log("Generating code...")
    this.http
      .post(`/api/generate_from_string`, 
        formData,
        {
          params: {
            "template": templateLanguage,
            "params": `{"zip": "true"}`
          }
        }
      )
      .subscribe(response => this.handleGenerateCodeResponse(response as GenerateCodeResponse));
  }

  generateClient(templateLanguage: string) {
    const specInput = this.fileHandlerService.getSpecFile();
    if (specInput) {
     this.generateFromSpecFile(specInput, templateLanguage);
    }
  }

  generateClientFromString(templateLanguage: string) {
    if (this.finalTemplateContent !== "") {
      this.generateFromSpecString(this.finalTemplateContent, templateLanguage);
    }
  }
}
