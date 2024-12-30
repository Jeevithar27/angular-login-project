import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../dependencies/employee.service';

@Component({
  selector: 'app-employee-search-child',
  imports: [CommonModule,FormsModule],
  templateUrl: './employee-search-child.component.html',
  styleUrl: './employee-search-child.component.css'
})
export class EmployeeSearchChildComponent {
  @Input() employeeCode:any ="";
  @Input() employee :any ="";
  @Input() search:boolean=false;
  updateButton=true;

  constructor(private employeeService:EmployeeService){}

  statusChange(){
    this.updateButton=false;
  }

  @Output() updateEmpId = new EventEmitter<{id: number, status: number}>(); 
  updateStatus(id:number,status:number){
    this.updateEmpId.emit({ id:id, status:status });
  }

  getRole(roleId: number) {
    return this.employeeService.getRole(roleId);
  }

  getMaritalStatus(id: number) {
    return this.employeeService.getMaritalStatus(id);
  }
  
 
}
