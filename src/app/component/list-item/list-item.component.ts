import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../data/index';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent {
  @Input() employee: Employee;
  @Output() onEmployeeClicked = new EventEmitter();
  onItemClicked() {
    this.onEmployeeClicked.emit({
      $employee: this.employee
    })
  }
}
