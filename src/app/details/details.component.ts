import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
      detail=[];
     
      private uid:string;
  constructor(private activateRouter:ActivatedRoute,private userService:UserService) {
    let object = this;
    object.uid = this.activateRouter.snapshot.paramMap.get('id');
    console.log("heee ram");
  
   }

  ngOnInit() 
  { this.userService.getDetails(this.uid)
    .subscribe(data=>{
      this.detail=data;
    })
  }
  
}
