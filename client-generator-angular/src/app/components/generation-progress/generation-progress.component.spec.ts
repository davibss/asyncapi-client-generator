import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationProgressComponent } from './generation-progress.component';

describe('GenerationProgressComponent', () => {
  let component: GenerationProgressComponent;
  let fixture: ComponentFixture<GenerationProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerationProgressComponent]
    });
    fixture = TestBed.createComponent(GenerationProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
