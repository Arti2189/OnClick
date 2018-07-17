import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
@Component({
  selector: 'app-listvlist',
  templateUrl: './listvlist.component.html',
  styleUrls: ['./listvlist.component.css']
})
export class ListvlistComponent implements OnInit {


    users =[];
    constructor(private userService: UserService){}
    ngOnInit(){
      this.userService.getUsers()
      .subscribe(data =>{
        this.users =data;
      });
    }
    key:string='default'; //set default
    reverse:boolean=false;
    sort(key){
      this.key=key;
      this.reverse=!this.reverse;
    }
    //initializing p to one
    p:number=1;
}
