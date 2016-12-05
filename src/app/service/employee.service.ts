import { Injectable } from '@angular/core';

import { Employee, Department, State } from '../data/index';

const ALLOWED_EMPLOYEE_SORT_KEYS = ['', 'firstname', 'lastname'];

@Injectable()
export class EmployeeService {

	constructor(private state: State) { }

	getState() {
		return this.state;
	}

	getEmployeeById(id: string): Promise<Employee> {
		return Promise.resolve(this.state.employees.find(e => e.id === id));
	}

	getDepartmentById(id: string): Promise<Department> {
		return Promise.resolve(this.state.departments.find(e => e.id === id));
	}

	addEmployee(newEmployee: Employee): Promise<string> {
		newEmployee.id = generateNewId();
		this.state.employees.push(newEmployee);
		if (newEmployee.department) {
			if (!this.state.departments.find(d => d.id === newEmployee.department.id)) {
				this.state.departments.push(newEmployee.department);
			}
		}
		this.refreshView();
		return Promise.resolve(newEmployee.id);
	}

	removeEmployeeById(id: string): Promise<Employee> {
		let idx = this.state.employees.findIndex(e => e.id === id);
		let toRemove = this.state.employees[idx];
		this.state.employees.splice(idx, 1);
		this.refreshView();
		return Promise.resolve(toRemove);
	}

	updateEmployee(modifedEmployee: Employee): Promise<Employee> {
		let employee = this.state.employees.find(e => e.id === modifedEmployee.id);
		if (employee) {
			Object.assign(employee, modifedEmployee);
		}
		this.refreshView();
		return Promise.resolve(employee);
	}

	sortEmployee(key: string, asc: boolean) {
		const foundKeyIndex = ALLOWED_EMPLOYEE_SORT_KEYS.findIndex(k => k === key);
		if (foundKeyIndex === -1) {
			throw new Error(`cannot sort by key ${key}, allowed sort keys are ${ALLOWED_EMPLOYEE_SORT_KEYS}`);
		}
		this.state.view.sort.key = key;
		this.state.view.sort.asc = asc ? true : false;
		this.refreshView();
	}

	searchEmployee(args: {
		employeeSearchValue?: string;
		departmentSearchValue?: string;
	} = {}) {
		this.state.view.search = {
			employeeSearchValue: (args.employeeSearchValue === undefined) ? this.state.view.search.employeeSearchValue : args.employeeSearchValue,
			departmentSearchValue: (args.departmentSearchValue === undefined) ? this.state.view.search.departmentSearchValue : args.departmentSearchValue
		}
		this.refreshView();
	}

	refreshView() {
		this.filter();
		this.sort();
	}

	filter() {

		const empSearch = this.state.view.search.employeeSearchValue.toLowerCase();
		const departSearch = this.state.view.search.departmentSearchValue.toLowerCase();

		this.state.viewEmployees = this.state.employees.filter((emp) => {
			let pass = true;
			if (empSearch) {
				pass = pass && (emp.firstname.toLowerCase().indexOf(empSearch) != -1 || emp.lastname.toLowerCase().indexOf(empSearch) != -1);
			}
			if (departSearch) {
				pass = pass && (emp.department ? emp.department.name.toLowerCase().indexOf(departSearch) != -1 : false);
			}
			return pass;
		});

	}

	sort() {
		let prop = this.state.view.sort.key;
		let asc = this.state.view.sort.asc;
		if (!prop) {
			return;
		}
		this.state.viewEmployees = this.state.viewEmployees.sort((a: Employee, b: Employee) => {
			let aValue: string = a[prop] as string;
			let bValue: string = b[prop] as string;
			let ret = aValue > bValue ? 1 : (aValue == bValue ? 0 : -1);
			return asc ? ret : -ret;
		});
	}

	addDummyData() {
		let emp1: Employee, emp2: Employee, emp3: Employee;
		let depart1: Department, depart2: Department;
		depart1 = new Department({
			id: 'd1',
			name: 'Depart. R&D'
		});
		depart2 = new Department({
			id: 'd2',
			name: 'Depart. Innovation'
		});
		emp1 = new Employee({
			firstname: 'John',
			lastname: 'Barathon',
			phonenumber: '0404 000 001',
			department: depart1
		});
		emp2 = new Employee({
			firstname: 'Arya',
			lastname: 'Stark',
			phonenumber: '0404 000 003',
			department: depart2
		});
		emp3 = new Employee({
			firstname: 'Tyrion',
			lastname: 'Lannister',
			phonenumber: '0404 000 002',
			department: depart1
		});
		this.addEmployee(emp1);
		this.addEmployee(emp2);
		this.addEmployee(emp3);
	}

}

function generateNewId() {
	var S4 = function() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
