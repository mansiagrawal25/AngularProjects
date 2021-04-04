import { Injectable } from '@angular/core';
// import {HttpClient} from '@angular/common/http';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
//  headers = new HttpHeaders().set('Content-Type', 'application/json' ).set("Access-Control-Allow-Origin","*");
 httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'application/json'
   
  })
};
  constructor(private http:HttpClient) { }

   doRegistration(user:User): Observable<any>{
    // console.log(user);
    console.log(this.httpOptions);
    return this.http.post("http://localhost:8080/v1/signup",user,this.httpOptions)   .pipe(
        catchError((err) => {
          
          return throwError(err);
        })
      );
  }

  login(user:User){
    return this.http.get(`http://localhost:8080/v1/login/${user.username}/${user.password}`).pipe(
        catchError((err) => {
          
          return throwError(err);
        })
      );
  }
}
