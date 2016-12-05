import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Employee, State } from '../../data/index';
import { EmployeeService } from '../../service/index';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  constructor(
    private employeeService: EmployeeService,
    private router: Router) {
  }

  getState() {
    return this.employeeService.getState();
  }

  onCreateNew() {
    this.router.navigate(['/new']);
  }
  onItemClicked(employee: Employee) {
    this.router.navigate(['/employee', employee.id]);
  }

  unsort() {
    this.employeeService.sortEmployee('', true);
  }

  sortByLastname(asc: boolean) {
    this.employeeService.sortEmployee('lastname', asc);
  }

  onNameSearchChanged(e: KeyboardEvent) {
    let searchValue = (<HTMLInputElement>e.target).value;
    this.employeeService.searchEmployee({
      employeeSearchValue: searchValue
    });
  }

  onDepartmentSearchChanged(e: KeyboardEvent) {
    let searchValue = (<HTMLInputElement>e.target).value;
    this.employeeService.searchEmployee({
      departmentSearchValue: searchValue
    });
  }
}
