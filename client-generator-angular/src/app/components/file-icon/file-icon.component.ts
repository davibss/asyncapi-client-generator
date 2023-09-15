import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-file-icon',
  templateUrl: './file.svg',
  styleUrls: ['./file-icon.component.css']
})
export class FileIconComponent {
  @Input() fillColor = '#000000';
  @Input() width = '16px';
  @Input() height = '16px';
}
