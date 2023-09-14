import { Component } from '@angular/core';
import { TemplateClientGeneratorService } from 'src/app/services/template-client-generator.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent {
  selectedTemplate: string = 'CPP';

  constructor(private templateClientGenerator: TemplateClientGeneratorService) {}

  handleGenerateCode() {
    this.templateClientGenerator.generateClient(this.selectedTemplate);
  } 
}
