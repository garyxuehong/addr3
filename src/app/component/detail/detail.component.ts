import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Employee } from '../../data/index';
import { EmployeeService } from '../../service/index';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  private employee: Employee;
  @Output() onDelete: EventEmitter<Employee> = new EventEmitter<Employee>();
  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) {
  }
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.employeeService.getEmployeeById(params['id']))
      .subscribe((emp: Employee) => this.employee = emp);
  }
  back() {
    this.router.navigate(['/employees']);
  }
  delete() {
    this.employeeService.removeEmployeeById(this.employee.id).then(()=>{
      this.router.navigate(['/employees']);
    });
  }
}
