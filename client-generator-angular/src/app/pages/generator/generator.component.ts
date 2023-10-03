import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { TemplateClientGeneratorService } from 'src/app/services/template-client-generator.service';
import { Parser } from '@asyncapi/parser';
import { Server } from '@asyncapi/parser/esm/models/v2/server';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
  selectedTemplate: string = 'CPP';
  mode: ProgressSpinnerMode = "indeterminate";
  color: ThemePalette = "primary";
  loading: boolean = false;
  onlySourceFiles: boolean = false;
  selectedServer: string = "default";
  asyncApiSpecServers: string[] = [];
  parser: Parser = new Parser();

  constructor(private templateClientGenerator: TemplateClientGeneratorService) {}

  ngOnInit(): void {
    const loadServers = async () => {
      try {
        const { document } = await this.parser.parse(this.templateClientGenerator.getFinalTemplateContent());
        this.asyncApiSpecServers = document?.servers().all().map(server => server.id()) as string[];
      } catch(err) {
        window.alert(`Some error occurred when parsing your AsyncAPI spec. Err: ${err}`);
      }
    }
    loadServers();
  }

  handleLanguageClick(language: string) {
    this.selectedTemplate = language;
    if (language === 'ANGULAR') {
      this.onlySourceFiles = true;
    }
  }

  handleGenerateCode() {
    this.loading = true;
    const params: {[key: string]: string} = {};
    params["onlySourceFiles"] = "false";
    if (this.onlySourceFiles && (this.selectedTemplate === 'CPP' || this.selectedTemplate === 'ANGULAR')) {
      params["onlySourceFiles"] = "true";
    }
    if (this.selectedServer !== "default") {
      params["choosedServer"] = this.selectedServer;
    }
    if (this.loading && this.selectedTemplate !== "") {
      try {
        this.templateClientGenerator.generateClientFromString(
          this.selectedTemplate, 
          () => { this.loading = false; },
          params 
        );
      } catch(_) {
        this.loading = false;
      }
    }
  }
}
