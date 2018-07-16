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

  insertContact(yourName:string ,Email:string ,Subject:string,Message:string):Observable<any>
  {
       return this.http.get(this.baseUrl+yourName+"/"+Email+"/"+Subject+"/"+Message);
  }

  validateContact(contact){
    if(contact.yourName==undefined || contact.Email == undefined || contact.Subject == undefined || contact.Message == undefined){
    return false;
    }
    else{
    return true;
    }
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
