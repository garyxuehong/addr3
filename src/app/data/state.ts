import { Injectable } from '@angular/core';

import { Employee } from './employee';
import { Department } from './department';

@Injectable()
export class State {
	employees: Employee[] = [];
	viewEmployees: Employee[] = [];
	departments: Department[] = [];
	view = {
		sort: {
			key: 'firstname',
			asc: true
		},
		search: {
			employeeSearchValue: '',
			departmentSearchValue: ''
		}
	}
}
