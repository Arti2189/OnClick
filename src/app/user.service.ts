import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class UserService {

  constructor(private http:HttpClient) { }
  baseUrl: string = 'http://localhost:3001/list/';
  getUsers(){
    return this.http.get<any>(this.baseUrl);
  }

  getDetails(id:string):Observable<any>
  {
       return this.http.get(this.baseUrl+id);
  }
}
