import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { error } from 'console';
import { response } from 'express';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Experience {
  'id': number,
  'company_name': string,
  'start_date': Date,
  'end_date': Date,
  'status': boolean
}


export interface Employee {
  'id': number,
  'code': string,
  'name': string,
  'email': string,
  'role': string,
  'status': number
  'education': string,
  'native': string,
  'current_location': string,
  'marital_status': number,
  'address':string
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url = "http://localhost/RESTAPIPHP-main/Employee.php";
  private status = null;

  private responseJson: any = [];




  constructor(private http: HttpClient, private router:Router) {


  }

  private roleList = [
    {
      id: 1,
      name: "Software Engineer"
    },
    {
      id: 2,
      name: "Quality Analysis"
    },
    {
      id: 3,
      name: "Business Analysis"
    },
    {
      id: 4,
      name: "Dev Oops"
    },
    {
      id: 5,
      name: "Module Lead"
    },
    {
      id: 6,
      name: "Team Lead"
    }
  ];

  private statusList = [
    {
      id: 1,
      name: "Active"
    },
    {
      id: 2,
      name: "Inactive"
    }
  ];

  private relationStatusList = [
    {
      id: 1,
      name: "Single",
    },
    {
      id: 2,
      name: "Married"
    }
  ];

  private employees: Employee[] = [];
  private employee = [];

  saveEmployee(employeeData: Employee):Observable<Employee> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Employee>(this.url, employeeData, { headers });
  }

  getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.url + '?id=' + id);
  }


  updateEmployee(id:number,employee:Employee):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(this.url+ '?id=' + id,employee,{headers});
  }

  deleteEmployee(id:number):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(this.url+ '?id=' + id,{headers});
  }

  

  getStatusButton(id: number): string {
    this.employees.find((emp) => Number(emp.id) === id);
    return "<span>Active</span>";
  }



  getRoleList() {
    return this.roleList;
  }

  getStatusList() {
    return this.statusList;
  }

  getRelationStatusList() {
    return this.relationStatusList;
  }

  employeeListUrl (){
    return this.router.navigateByUrl('/employee');
  }

  updateStatus(id:number,status:number):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('http://localhost/RESTAPIPHP-main/SearchEmployee.php?id='+id,{'status':status},{headers});
   }

   getEmployeeBycode(code: string): any {
    return this.http.get('http://localhost/RESTAPIPHP-main/SearchEmployee.php?code='+code);
  }
}
