import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { UserService } from 'src/app/user.service';
import {ActivatedRoute} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  saveUser=[];
  data:string = "";
  username:string = "";
  emailaddress:string = "";
  password:string = "";
  confirmpassword:string = "";

  searchUser=[];

  constructor(private userService:UserService,) {}

    register(form:NgForm){
     this.data = form.value.username + " " + form.value.emailaddress + " " + form.value.password + " " + form.value.confirmpassword;
     this.username = form.value.username;
     this.emailaddress = form.value.emailaddress;
     this.password = form.value.password;
     this.confirmpassword = form.value.confirmpassword; 

     
     this.userService.register(this.username,this.emailaddress,this.password,this.confirmpassword)
    .subscribe(data=>{
      console.log(data);
      this.saveUser=data;
      console.log(this.saveUser);

      this.username = "";
      this.emailaddress = "";
      this.password = "";
      this.confirmpassword = "";

    }) 
  }

    login(form: NgForm) {
    this.username = form.value.username;
    this.password = form.value.password;
    //  console.log(this.username + " " + this.password);
    if (this.username != "" && this.password != "" ) {
      this.userService.loginUser(this.username,this.password)
      .subscribe(data => {
        console.log(data);
         this.searchUser = data; });
      console.log(this.searchUser);
    }

    }

  ngOnInit() {
  }

}

