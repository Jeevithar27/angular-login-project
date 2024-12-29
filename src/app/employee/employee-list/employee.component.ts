import { Component } from '@angular/core';
import { EmployeeService } from '../../dependencies/employee.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-employee',
  imports: [FormsModule,CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  employees : any;
  successMessage: string = '';
  errorMessage: string = '';


constructor(private employeeService: EmployeeService, private router: Router){
  this.employees = this.loadEmployees();
}

loadEmployees() {
  this.employeeService.getEmployee().subscribe((res:any)=>{
      this.employees = res.data;
  })
}

viewEmployeeDetail(id:any){
  this.router.navigate(['/employee', id]);
}

createEmployee(){
  this.router.navigateByUrl('employee/create');
}

getStatusButton(id:number):string{
  return this.employeeService.getStatusButton(id);
}


editEmployee(id:number){
  this.router.navigate(['/employee/edit/',id]);

}

deleteEmployee(id:number){
  return this.employeeService.deleteEmployee(id).subscribe(
    (response:any)=>{
    if(response.code == 200){
      this.employees = this.loadEmployees();
      this.successMessage = "Employee deleted successfully";
      this.errorMessage ='';
    }else{
      this.errorMessage= response.message;
      this.successMessage = '';
    }
    setTimeout(()=>{                        
      this.successMessage = '';
      this.errorMessage = '';
    }, 20000);
  });
}
   
}
