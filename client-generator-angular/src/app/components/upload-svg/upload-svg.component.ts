import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-upload-svg',
  templateUrl: './upload.svg',
  styleUrls: ['./upload-svg.component.css']
})
export class UploadSvgComponent {
  @Input() fillColor = '#FFFFFF';
  @Input() width = '16px';
  @Input() height = '16px';
}
