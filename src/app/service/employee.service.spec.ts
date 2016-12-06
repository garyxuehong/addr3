/* tslint:disable:no-unused-variable */
import 'should';

import { TestBed, async, inject } from '@angular/core/testing';

import { EmployeeService } from './employee.service';
import { State, Employee, Department } from '../data';

const DATA_FAKE_ID = 'fake id';
const DATA_FAKE_FIRSTNAME = 'fake first name';
const DATA_FAKE_LASTNAME = 'fake last name';

describe('Service', () => {
	let state, service;
	beforeEach(() => {
		state = new State();
		service = new EmployeeService(state);
	})
	it('should init correctly', () => {
		service.should.not.be.null();
		service.should.not.be.undefined();
	})
	describe('functionality', () => {
		let employee;
		beforeEach(() => {
			employee = new Employee();
			employee.id = DATA_FAKE_ID;
			employee.firstname = DATA_FAKE_FIRSTNAME;
			employee.lastname = DATA_FAKE_LASTNAME;
		})
		describe('of adding', () => {
			it('should success', () => {
				const newId = service.addEmployee(employee);
				newId.should.not.be.null();
				newId.should.not.be.undefined();
				newId.should.not.be.equal(DATA_FAKE_ID);
				service.getState().employees.length.should.be.equal(1);
				const addedEmployee = service.getState().employees[0];
				addedEmployee.firstname.should.equal(DATA_FAKE_FIRSTNAME);
				addedEmployee.lastname.should.equal(DATA_FAKE_LASTNAME);
			})
		})
		describe('of updating', () => {
			beforeEach(() => {
				service.addEmployee(employee);
			})
			it('should success', () => {
				const modifyEmployee = new Employee();
				modifyEmployee.id = employee.id;
				const newFirstname = 'new firstname';
				const newLastname = 'new lastname';
				modifyEmployee.firstname = newFirstname;
				modifyEmployee.lastname = newLastname;
				service.updateEmployee(modifyEmployee);
				employee.firstname.should.be.equal(newFirstname);
				employee.lastname.should.be.equal(newLastname);
			})
		})
		describe('of deleting', () => {
			let newId;
			beforeEach(() => {
				newId = service.addEmployee(employee);
			})
			it('should success', () => {
				const removed = service.removeEmployeeById(newId);
				removed.should.not.be.null();
				removed.should.not.be.undefined();
				service.getState().employees.length.should.be.equal(0);
			})
		})
		describe('(advance)', () => {
			let emp1, emp2, emp3;
			let depart1, depart2;
			beforeEach(() => {
				depart1 = new Department({
					id: 'd1',
					name: 'Department Super 1'
				});
				depart2 = new Department({
					id: 'd2',
					name: 'Department Crazy 2'
				});
				emp1 = new Employee({
					firstname: 'fn1',
					lastname: 'ln1',
					department: depart1
				});
				emp2 = new Employee({
					firstname: 'fn2',
					lastname: 'ln2',
					department: depart1
				});
				emp3 = new Employee({
					firstname: 'fn3',
					lastname: 'ln3',
					department: depart2
				});
				service.addEmployee(emp1);
				service.addEmployee(emp2);
				service.addEmployee(emp3);
			})
			describe('of sorting ', () => {
				describe('by firstname', () => {
					it('should sort correctly', () => {
						service.sortEmployee('firstname', true);
						service.getState().viewEmployees[0].firstname.should.be.equal('fn1');
						service.getState().viewEmployees[1].firstname.should.be.equal('fn2');
						service.getState().viewEmployees[2].firstname.should.be.equal('fn3');
						service.sortEmployee('firstname', false);
						service.getState().viewEmployees[0].firstname.should.be.equal('fn3');
						service.getState().viewEmployees[1].firstname.should.be.equal('fn2');
						service.getState().viewEmployees[2].firstname.should.be.equal('fn1');
					})
				})
				describe('by lastname', () => {
					it('should sort correctly', () => {
						service.sortEmployee('lastname', true);
						service.getState().viewEmployees[0].lastname.should.be.equal('ln1');
						service.getState().viewEmployees[1].lastname.should.be.equal('ln2');
						service.getState().viewEmployees[2].lastname.should.be.equal('ln3');
						service.sortEmployee('lastname', false);
						service.getState().viewEmployees[0].lastname.should.be.equal('ln3');
						service.getState().viewEmployees[1].lastname.should.be.equal('ln2');
						service.getState().viewEmployees[2].lastname.should.be.equal('ln1');
					})
				})
			})
			describe('of search', () => {
				describe('by name', () => {
					it('should filter employees by name correctly', () => {
						service.searchEmployee({
							employeeSearchValue: '2'
						});
						service.getState().viewEmployees.length.should.be.equal(1);
						service.getState().viewEmployees[0].firstname.should.be.equal('fn2');
						service.getState().viewEmployees[0].lastname.should.be.equal('ln2');
					})
				})
				describe('by department', () => {
					it('should filter employees by departments correctly', () => {
						service.searchEmployee({
							departmentSearchValue: 'super'
						});
						service.getState().viewEmployees.length.should.be.equal(2);
						service.getState().viewEmployees[0].firstname.should.be.equal('fn1');
						service.getState().viewEmployees[1].firstname.should.be.equal('fn2');
						service.searchEmployee({
							departmentSearchValue: 'crazy'
						});
						service.getState().viewEmployees.length.should.be.equal(1);
						service.getState().viewEmployees[0].firstname.should.be.equal('fn3');
					})
				})
			})
		})
	})
})
