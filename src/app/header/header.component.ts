import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { ActivatedRoute,Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //variable declarations
  saveUser = [];
  data: string = "";
  username: string = "";
  emailaddress: string = "";
  password: string = "";
  searchUser = [];
  isLoggedIn: boolean;
  display: string = "";
  display1: string = "";
  router: Router;
  //constructor to declare services
  constructor(private userService: UserService, router:Router) {
    this.router = router;
    if (localStorage.getItem('user') == null)
      this.isLoggedIn = false;
    else {
      this.isLoggedIn = true;
      console.log(localStorage.getItem('user'));
      this.username = localStorage.getItem('user');
      console.log(this.username);
    }
  }

  openModal() {
    this.display = 'block';
  }
  closeModal() {
    this.display = 'none';
  }

  //register method to user registration
  register(form: NgForm) {
    this.data = form.value.username + " " + form.value.emailaddress + " " + form.value.password;
    this.username = form.value.username;
    this.emailaddress = form.value.emailaddress;
    this.password = form.value.password;
    this.userService.register(this.username, this.emailaddress, this.password)
      //subscribe to process data   
      .subscribe(data => {
        console.log(data);
        this.saveUser = data;
        this.username = "";
        this.emailaddress = "";
        this.password = "";
        //put some validation 
        let username: string
        localStorage.setItem('user', this.username);
        this.username = 'user';
        this.isLoggedIn = true
      })
  }

  // login method for loging user into application
  login(form: NgForm) {
    this.username = form.value.username;
    this.password = form.value.password;
    if (this.username != "" && this.password != "") {
      this.userService.loginUser(this.username, this.password)
        .subscribe(data => {
          if (data.length == 0) {
            this.display = 'block';
          }
          else {
            localStorage.setItem('user', this.username);
            this.isLoggedIn = true
          }
        });
    }
  }
  logout() {
    this.username = "";
    console.log('hello');
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.router.navigate(['../banner']) //routing after logout
  }
  ngOnInit() {
  }
}

