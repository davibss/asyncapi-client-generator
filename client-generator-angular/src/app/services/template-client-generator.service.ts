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
  private params = {"zip": "true"};

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

  private handleGenerateCodeResponse(response: GenerateCodeResponse, templateLanguage: string, callback: () => void) {
    console.log("Code Generated. Downloading file...");
    const generateId = response.message.ID;
      this.http
        .get(`${this.baseURL}/api/download_client/${generateId}`, {
          responseType: "arraybuffer"
        })
        .subscribe({
          next: (response) => {
            try {
              var blob = new Blob([response], { type: 'application/zip' });
              const file = new File([blob], `generated_code_${templateLanguage.toLowerCase()}.zip`);
              this.fileHandlerService.setGeneratedZipFile(file);
              this.fileHandlerService.extractZip(file);
              console.log("File downloaded");
              callback();
              this.router.navigate(['generation', 'review']);
            } catch(err) {
              window.alert("some error occurred!");
              callback();
            }  
          },
          error(err) {
            window.alert("some error occurred while getting generated zip");
            callback();
          }
        });
  }

  private async generateFromSpecFile(specFile: File, templateLanguage: string = "CPP", params: {[key: string]: string}) {  
    const formData = new FormData();
    formData.append("asyncapispec", specFile);
    console.log("Generating code...")
    this.http
      .post(`${this.baseURL}/api/generate`, 
        formData,
        {
          params: {
            "template": templateLanguage,
            "params": JSON.stringify({...params, ...this.params})
          }
        }
      )
      .subscribe(response => this.handleGenerateCodeResponse(response as GenerateCodeResponse, templateLanguage, () => {}));
  }

  private generateFromSpecString(
    templateContent: string, 
    templateLanguage: string = "CPP", 
    params: {[key: string]: string},
    callback: () => void
  ) {  
    const formData = new FormData();
    formData.append("asyncapispec", templateContent);
    console.log("Generating code...")
    this.http
      .post(`${this.baseURL}/api/generate_from_string`, 
        formData,
        {
          params: {
            "template": templateLanguage,
            "params": JSON.stringify({...params, ...this.params})
          }
        }
      )
      .subscribe({
        next: (response) => {
          this.handleGenerateCodeResponse(response as GenerateCodeResponse, templateLanguage, callback);
        },
        error(err) {
          window.alert("some error has occurred in generation process");
          callback();
        },
      });
  }

  generateClient(templateLanguage: string, params: {[key: string]: string}) {
    const specInput = this.fileHandlerService.getSpecFile();
    if (specInput) {
     this.generateFromSpecFile(specInput, templateLanguage, params);
    }
  }

  generateClientFromString(templateLanguage: string, callback: () => void, params: {[key: string]: string} = {}) {
    this.generateFromSpecString(this.finalTemplateContent, templateLanguage, params, callback);
  }
}
