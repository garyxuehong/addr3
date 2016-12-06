/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DetailComponent } from './detail.component';

import { Employee, Department } from '../../data';

import { EmployeeService } from '../../service';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailComponent],
      providers: [
        { provide: EmployeeService, useValue: getEmpty() },
        {
          provide: ActivatedRoute, useValue: {
            params: {
              switchMap: () => ({
                subscribe: () => { }
              })
            }
          }
        },
        {
          provide: Router, useValue: {
            navigate: () => { }
          }
        },
        { provide: Location, useValue: getEmpty() }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    component.employee = getFakeEmployee();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render supplly employee detail', () => {
    let compiled = fixture.debugElement.nativeElement;
    const fake = getFakeEmployee();
    expect(compiled.querySelector('.id').textContent).toContain(fake.id);
    expect(compiled.querySelector('.firstname').textContent).toContain(fake.firstname);
    expect(compiled.querySelector('.lastname').textContent).toContain(fake.lastname);
    expect(compiled.querySelector('.phonenumber').textContent).toContain(fake.phonenumber);
    expect(compiled.querySelector('.department').textContent).toContain(fake.department.name);
  })

});

function getEmpty() {
  return {

  }
}

function getFakeEmployee() {
  return new Employee({
    id: 'new-id',
    firstname: 'fn',
    lastname: 'ln',
    department: new Department({
      id: 'new-depart',
      name: 'dname'
    }),
    phonenumber: '0404 000 000'
  });
}
