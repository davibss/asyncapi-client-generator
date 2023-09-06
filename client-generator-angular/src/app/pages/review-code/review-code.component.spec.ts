import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCodeComponent } from './review-code.component';

describe('ReviewCodeComponent', () => {
  let component: ReviewCodeComponent;
  let fixture: ComponentFixture<ReviewCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewCodeComponent]
    });
    fixture = TestBed.createComponent(ReviewCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
