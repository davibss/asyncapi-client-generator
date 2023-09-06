import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSpecComponent } from './choose-spec.component';

describe('ChooseSpecComponent', () => {
  let component: ChooseSpecComponent;
  let fixture: ComponentFixture<ChooseSpecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseSpecComponent]
    });
    fixture = TestBed.createComponent(ChooseSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
