/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListItemComponent } from './list-item.component';

import { Employee, Department } from '../../data';

describe('ListItemComponent', () => {

  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;
  let employee: Employee;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    component.employee = getFakeEmployee();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render supplly employee detail', ()=>{
    let compiled = fixture.debugElement.nativeElement;
    const fake = getFakeEmployee();
    expect(compiled.querySelector('.firstname').textContent).toContain(fake.firstname);
    expect(compiled.querySelector('.lastname').textContent).toContain(fake.lastname);
    expect(compiled.querySelector('.department').textContent).toContain(fake.department.name);
  })

});

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
    fixture.employee = employee;
    fixture.detectChanges();
  });
}