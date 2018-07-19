import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { UserService } from 'src/app/user.service';
import {ActivatedRoute} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-blogdetails',
  templateUrl: './blogdetails.component.html',
  styleUrls: ['./blogdetails.component.css']
})
export class BlogdetailsComponent implements OnInit {
  review = [];
  saveData=[];
  data:string = "";
  yourName:string = "";
  Email:string = "";
  Category:string = "";
  Message:string = "";

  constructor(private userService:UserService) {}

 insertReview(form:NgForm){
     this.data = form.value.yourName + " " + form.value.Email + " " + form.value.Category + " " + form.value.Message;
     this.yourName = form.value.yourName;
     this.Email = form.value.Email;
     this.Category = form.value.Category;
     this.Message = form.value.Message; 
     
     this.userService.insertReview(this.yourName,this.Email,this.Category,this.Message)
    .subscribe(data=>{
      this.saveData=data;
      this.yourName = "";
      this.Email = "";
      this.Category = "";
      this.Message = "";

    }) 
  }
    
  
  ngOnInit() {
    this.userService.getReviews()
      .subscribe(data => {
        console.log(data);
        this.review = data;
      });
 
  }

}
