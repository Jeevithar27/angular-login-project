import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../dependencies/employee.service';
import { CommonModule } from '@angular/common';
import { response } from 'express';



@Component({
  selector: 'app-employee-detail',
  imports: [CommonModule],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent implements OnInit {

  employee: any;

  constructor(private activedRouter: ActivatedRoute, private employeeService: EmployeeService, private router: Router) {
  }

  ngOnInit(): void {
    const employeeId: number | null = Number(this.activedRouter.snapshot.paramMap.get('id'));
    if (employeeId) {
      this.employeeService.getEmployeeById(employeeId).subscribe((response: any) => {
        if (response.code == 200) {
          this.employee = response.data;
        }

      });
      console.log(this.employee);
    }
  }

  backToEmployee() {
    this.router.navigateByUrl('/employee');
  }

  getRole(roleId: number) {
    return this.employeeService.getRole(roleId);
  }

  getStatus(status: number) {
    return this.employeeService.getStatus(status);
  }

  getMaritalStatus(id: number) {
    return this.employeeService.getMaritalStatus(id);
  }

}
