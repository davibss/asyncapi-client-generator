import { TestBed } from '@angular/core/testing';

import { TemplateClientGeneratorService } from './template-client-generator.service';

describe('TemplateClientGeneratorService', () => {
  let service: TemplateClientGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateClientGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
