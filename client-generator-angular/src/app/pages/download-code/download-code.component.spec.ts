import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadCodeComponent } from './download-code.component';

describe('DownloadCodeComponent', () => {
  let component: DownloadCodeComponent;
  let fixture: ComponentFixture<DownloadCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadCodeComponent]
    });
    fixture = TestBed.createComponent(DownloadCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
