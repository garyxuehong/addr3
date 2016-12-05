/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmployeeServiceService } from './employee.service';

describe('EmployeeServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeServiceService]
    });
  });

  it('should ...', inject([EmployeeServiceService], (service: EmployeeServiceService) => {
    expect(service).toBeTruthy();
  }));
});
