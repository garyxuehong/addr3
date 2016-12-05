import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Employee, Department } from '../../data/index';
import { EmployeeService } from '../../service/index';

@Component({
  selector: 'app-new-emp',
  templateUrl: './new-emp.component.html',
  styleUrls: ['./new-emp.component.css']
})
export class NewEmpComponent {
  private employee: Employee;
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private location: Location) {
    this.employee = new Employee();
  }
  submit() {
    this.employeeService.addEmployee(this.employee).then(()=>{
      this.router.navigate(['/employees']);
    })
  }
  cancel() {
    this.router.navigate(['/employees']);
  }
}
