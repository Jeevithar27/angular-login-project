import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService, Employee } from '../../dependencies/employee.service';
import { error } from 'console';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { response } from 'express';
import { UppercaseDirective } from '../../uppercase.directive';



@Component({
  selector: 'app-employee-create',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './employee-create.component.html',
  styleUrl: './employee-create.component.css'
})
export class EmployeeCreateComponent {
  title = 'Employee create';
  employeeData: Employee | null = null;
  successMessage:string='';
  errorMessage:string='';
  submitted: boolean = false;
  myform: FormGroup;
  fields: any = [];

  router = inject(Router);
  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService,private http:HttpClient ) {
    this.myform = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      education: ['', Validators.required],
      native: ['', Validators.required],
      current_location: ['', Validators.required],
      marital_status: ['', Validators.required],
      address: '',
    });

    this.fields = [
      { name: "code", label: "Employee Id", placeholder: "Employee Id", minLength: 3, require: true, type: "text" },
      { name: "name", label: "Full Name", placeholder: "Full Name", minLength: 3, require: true, type: "text" },
      { name: "email", label: "Email", placeholder: "Email", minLength: 3, require: true, type: "text" },
      {
        name: "role", label: "Role", placeholder: "Role", require: true, type: "dropdown", option: this.employeeService.getRoleList()
      },
      { name: "education", label: "Education", placeholder: "Education", require: true, type: "text" },
      { name: "native", label: "Native", placeholder: "Native", require: true, type: "text" },
      { name: "current_location", label: "Current Location", placeholder: "Current Location", require: true, type: "text" },
      { name: "marital_status", label: "Marital Status", placeholder: "Marital Status", require: true, type: "dropdown", option: this.employeeService.getRelationStatusList() },
      { name: "address", label: "Address", placeholder: "Address", require: false, type: "text" }

    ];
  }



  saveEmployee() {
    this.submitted = true;
    if (this.myform.valid) {
      this.submitted = false;
      this.employeeService.saveEmployee(this.myform.value).subscribe((response:any)=>{
        if(response.code ==200){
          this.successMessage = "Employee created successfully";
          this.errorMessage ='';
          this.myform.reset();
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

  employeeListUrl (){
    return this.employeeService.employeeListUrl();
  }



}
