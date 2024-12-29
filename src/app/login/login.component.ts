import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userData :any = {
    userName : '',
    userPassword: ''
  };




 // constructor(private http: HttpClient, private route: Router, private loginService: LoginService) {}
 route = inject(Router);
 http = inject(HttpClient);

 myform : FormGroup;
 constructor(){
   this.userData.userName = new FormControl('',[Validators.required]);
   this.userData.userPassword = new FormControl('',Validators.required);
   this.myform = new FormGroup({
    'userName': this.userData.userName,
    'userPassword' : this.userData.userPassword
   });
 }


  onLogin() {
    if(this.myform.valid){
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.post("http://localhost/RESTAPIPHP-main/Login.php",this.myform.value, { headers }).subscribe((res:any)=>{
        console.log(res.code);
        if(res.code === 200 ){
          localStorage.setItem("userName",this.userData.userName.value);
          this.route.navigateByUrl('/dashboard');
        }else {
          alert('Credential is wrong!');
        }
      })
    }
  }
}