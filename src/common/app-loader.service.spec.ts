import { TestBed } from '@angular/core/testing';

import { AppLoaderService } from './app-loader.service';

describe('AppLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppLoaderService = TestBed.get(AppLoaderService);
    expect(service).toBeTruthy();
  });
});
