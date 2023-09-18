import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { TemplateClientGeneratorService } from 'src/app/services/template-client-generator.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent {
  selectedTemplate: string = 'CPP';
  mode: ProgressSpinnerMode = "indeterminate";
  color: ThemePalette = "primary";
  loading: boolean = false;

  constructor(private templateClientGenerator: TemplateClientGeneratorService) {}

  handleGenerateCode() {
    this.loading = true;
    if (this.loading && this.selectedTemplate !== "") {
      try {
        this.templateClientGenerator.generateClientFromString(
          this.selectedTemplate, () => { this.loading = false; }
        );
      } catch(_) {
        this.loading = false;
      }
    }
  }
}
