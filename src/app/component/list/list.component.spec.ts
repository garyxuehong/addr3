/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Router } from '@angular/router';

import { ListComponent } from './list.component';

import { ListItemComponent } from '../list-item/list-item.component';

import { EmployeeService } from '../../service';
import { State, Employee, Department } from '../../data';

describe('ListComponent', () => {

   let component: ListComponent;

   let fixture: ComponentFixture<ListComponent>;

   let employeeService: EmployeeService;

   beforeEach(() => {
      employeeService = getEmployeeService();
   })

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ListComponent, ListItemComponent],
         providers: [
            { provide: Router, useValue: {} },
            { provide: EmployeeService, useValue: employeeService }
         ]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(ListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should render correct number of items', () => {
      let compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('app-list-item').length).toEqual(2);
   })

});

function getEmployeeService() {
   let ret = new EmployeeService(new State());
   let d1 = new Department({
      id: 'd1',
      name: 'department 1'
   })
   ret.getState().departments.push(d1);
   ret.getState().employees.push(new Employee({
      id: 'emp1',
      firstname: 'fn1',
      lastname: 'ln1',
      department: d1,
      phonenumber: 'p1'
   }));
   ret.getState().employees.push(new Employee({
      id: 'emp2',
      firstname: 'fn2',
      lastname: 'ln2',
      department: d1,
      phonenumber: 'p2'
   }));
   ret.getState().viewEmployees = [].concat(ret.getState().employees);
   return ret;
}