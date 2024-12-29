import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}
  getData(data:any): Observable<any> {
    return this.http.get('https://freeapi.miniprojectideas.com/api/User/Login',data); // The proxy will forward this to http://localhost:4000/api/data
  }
}
