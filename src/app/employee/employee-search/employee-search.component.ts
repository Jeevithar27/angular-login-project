import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../dependencies/employee.service';
import { EmployeeSearchChildComponent } from '../employee-search-child/employee-search-child.component';
import { response } from 'express';

@Component({
  selector: 'app-employee-search',
  imports: [CommonModule,FormsModule,EmployeeSearchChildComponent],
  templateUrl: './employee-search.component.html',
  styleUrl: './employee-search.component.css'
})
export class EmployeeSearchComponent {
  employeeCode:string ='';
  employeeItem :any =[];
  search= false;
  errorMessage='';
  successMessage='';

  constructor(private router:Router, private employeeService:EmployeeService){}

  searchEmployee(){ 
   
    this.employeeService.getEmployeeBycode(this.employeeCode).subscribe((response:any)=>{
      if(response.code ==200){
        console.log('searc');
        console.log(response.data);
      this.employeeItem =response.data;
      }
    });
    this.search = true;
  }

  updateStatusId(data:any){

    this.employeeService.updateStatus(data.id,data.status).subscribe((response:any)=>{
      if(response.code ==200){
        this.successMessage = "Status Updated successfully";
        this.errorMessage = '';
      }else{
        this.errorMessage = "Status Updated Failed";
        this.successMessage = '';
      }
      setTimeout(()=>{                        
        this.successMessage = '';
        this.errorMessage = '';
      }, 20000);
    });

  }

}
