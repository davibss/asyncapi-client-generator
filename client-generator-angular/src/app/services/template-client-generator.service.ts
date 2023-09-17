import { Injectable } from '@angular/core';
import { FileHandlerService } from './file-handler.service';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

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

  private baseURL = environment.generateAPI;
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

  private handleGenerateCodeResponse(response: GenerateCodeResponse, callback: () => void) {
    console.log("Code Generated. Downloading file...");
    setTimeout(() => {
      const generateId = response.message.ID;
      this.http
        .get(`${this.baseURL}/api/download_client/${generateId}`, {
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
            callback();
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
      .post(`${this.baseURL}/api/generate`, 
        formData,
        {
          params: {
            "template": templateLanguage,
            "params": `{"zip": "true"}`
          }
        }
      )
      .subscribe(response => this.handleGenerateCodeResponse(response as GenerateCodeResponse, () => {}));
  }

  private generateFromSpecString(templateContent: string, templateLanguage: string = "CPP", callback: () => void) {  
    const formData = new FormData();
    formData.append("asyncapispec", templateContent);
    console.log("Generating code...")
    this.http
      .post(`${this.baseURL}/api/generate_from_string`, 
        formData,
        {
          params: {
            "template": templateLanguage,
            "params": `{"zip": "true"}`
          }
        }
      )
      .subscribe(response => this.handleGenerateCodeResponse(response as GenerateCodeResponse, callback));
  }

  generateClient(templateLanguage: string) {
    const specInput = this.fileHandlerService.getSpecFile();
    if (specInput) {
     this.generateFromSpecFile(specInput, templateLanguage);
    }
  }

  generateClientFromString(templateLanguage: string, callback: () => void) {
    this.generateFromSpecString(this.finalTemplateContent, templateLanguage, callback);
  }
}
