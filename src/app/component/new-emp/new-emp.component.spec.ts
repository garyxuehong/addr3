/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'should';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NewEmpComponent } from './new-emp.component';
import {EmployeeService} from '../../service';
import {State} from '../../data';

describe('NewEmpComponent', () => {
  let component: NewEmpComponent;
  let fixture: ComponentFixture<NewEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ NewEmpComponent ],
      providers: [
        {provide: Router, useValue: getRouter()}, 
        {provide: Location, useValue: getLocation()},
        EmployeeService, State]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function getLocation() {
  return {};
}

function getRouter() {
  return {
    navigate: ()=> {

    }
  }
}
