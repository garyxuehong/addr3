import { Component, OnInit } from '@angular/core';

import { Employee, Department, State } from './data/index';
import { EmployeeService } from './service/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	constructor(private employeeService: EmployeeService) { }
	ngOnInit(): void {
		this.employeeService.addDummyData();
	}
	getViewEmployees() {
		return this.employeeService.getState().viewEmployees;
	}
}