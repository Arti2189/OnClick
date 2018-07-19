import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { UserService } from 'src/app/user.service';
import {ActivatedRoute} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FlashMessage} from 'angular-flash-message';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  saveData=[];
  data:string = "";
  yourName:string = "";
  Email:string = "";
  Subject:string = "";
  Message:string = "";

  constructor(private userService:UserService) {}

 insertContact(form:NgForm){
     this.data = form.value.yourName + " " + form.value.Email + " " + form.value.Subject + " " + form.value.Message;
     this.yourName = form.value.yourName;
     this.Email = form.value.Email;
     this.Subject = form.value.Subject;
     this.Message = form.value.Message; 
     
     this.userService.insertContact(this.yourName,this.Email,this.Subject,this.Message)
    .subscribe(data=>{
      console.log(data);
      this.saveData=data;
      console.log(this.saveData);

      this.yourName = "";
      this.Email = "";
      this.Subject = "";
      this.Message = "";

    }) 
  }
    
  
  ngOnInit() {
  }

}
