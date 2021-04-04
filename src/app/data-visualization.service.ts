import { Injectable } from '@angular/core';
import { Data } from './data';
import { Observable, throwError } from 'rxjs';;
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataVisualizationService {
  
   httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'application/json'
   
  })
};

  constructor(private http:HttpClient) { }
  
   saveData(data:Data): Observable<any>{
    console.log(data);
    // console.log(this.httpOptions);
    return this.http.post("http://localhost:8080/v1/saveData",data,this.httpOptions);
  }
   public getList(): Observable<any> {
    return this.http.get('http://localhost:8080/v1/getAllData');
  }


  findByID(id:String) :Observable<any> {
    console.log(id)
    return this.http.get(`http://localhost:8080/v1/getDataById/${id}`) .pipe(
        catchError((err) => {
          
          return throwError(err);
        })
      );
  }
}
