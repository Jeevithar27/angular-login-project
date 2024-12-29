import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee, EmployeeService } from '../../dependencies/employee.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { response } from 'express';


@Component({
  selector: 'app-employee-edit',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.css'
})
export class EmployeeEditComponent implements OnInit {

  title = 'Employee create';
  employee: Employee | null = null;
  successMessage:string='';
  errorMessage:string='';
  submitted: boolean = false;
  myform: FormGroup;
  fields: any = [];

  router = inject(Router);

  ngOnInit(): void {
       
        const id = Number(this.activeRoute.snapshot.paramMap.get('id'));
        this.employeeService.getEmployeeById(id).subscribe((response:any)=>{
          if(response.code ==200){
            this.employee = response.data;
            console.log(response.data);
            this.myform.patchValue(response.data);
          }
        });
  }

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService,private http:HttpClient, private activeRoute: ActivatedRoute  ) {
    this.myform = this.formBuilder.group({
      code: '',
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

  employeeListUrl (){
    return this.employeeService.employeeListUrl();
  }

  updateEmployee(id:any){
    console.log(this.employee);
    console.log(id);
    this.employeeService.updateEmployee(id,this.myform.value).subscribe((response:any)=>{
      if(response.code ==200){
        this.successMessage = "Employee updated successfully";
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
