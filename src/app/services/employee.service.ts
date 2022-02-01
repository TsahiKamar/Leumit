import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError,tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
 
   headers = new HttpHeaders({
       'Access-Control-Allow-Origin': '*' 
        });
   options = { headers: this.headers };


constructor(private http: HttpClient) {
}

public getEmployees():Observable<any> {
return this.http.get<any>('http://localhost:63281/Employee/employees',this.options) 
.pipe(
  map((res: Employee) => res )
)
}

public calcSalaries(employees : Array<Employee>):Observable<any> {
  return this.http.post<any>('http://localhost:63281/Employee/calcTotalSalaries',employees,this.options) 
  .pipe(
    map((res: any) => res )
  )
  }
   
 
  public updateEmployeeDetails(request: Employee):Observable<any> {
    return this.http.put<any>('http://localhost:63281/Employee/updateEmployeeDetails',request,this.options)
    .pipe(
      map((res: any) => res )
    )    
   
  }
  

}
