import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/Router';

@Component({
  selector: 'app-listgrid',
  templateUrl: './listgrid.component.html',
  styleUrls: ['./listgrid.component.css']
})
export class ListgridComponent implements OnInit {

  users = [];
  keyword: string = "";
  city: string = "";
  state: string = "";
  categories: string = "";
  check:string="000";

  // sort:string = "";
  sortValue: string = "1";

  pizzaFromIndex1 = "";

  constructor(private userService: UserService) { }
  ngOnInit() {
    this.userService.getUsers()
      .subscribe(data => {
        this.users = data;
      });
  }

  getValue(sortValue: any) {
    this.sortValue = sortValue;
    console.log(sortValue);
  }

  searchData(form: NgForm) {
    this.keyword = form.value.keyword;
    this.state = form.value.state;
    this.city = form.value.city;
    this.categories = form.value.categories;

    // this.sort = form.value.sort;

    // console.log(this.sort);

    // without sorting---------------------------------------------------

    if (this.keyword != "" && this.state == "" && this.city == "" && this.categories == "" && this.sortValue == "1") {
      console.log("sort = " + this.sortValue);
      this.check = "1001";
      this.userService.getDataByKeyword(this.keyword).subscribe(data => { this.users = data; });
    }
    else if (this.keyword = "" && this.state != "" && this.city == "" && this.categories == "" && this.sortValue == "1") {
      this.check = "0101";
      this.userService.getDataByState(this.state).subscribe(data => { this.users = data; });
    }
    else if (this.keyword = "" && this.state == "" && this.city != "" && this.categories == "" && this.sortValue == "1") {
      this.check = "0011";
      this.userService.getDataByCity(this.city).subscribe(data => { this.users = data; });
    }
    else if (this.keyword = "" && this.state == "" && this.city == "" && this.categories != "" && this.sortValue == "1") {
      this.check = "1101";
      this.userService.getDataByCategories(this.categories).subscribe(data => { this.users = data; });
    }
    else if (this.keyword != "" && this.state != "" && this.city == "" && this.categories == "" && this.sortValue == "1") {
      this.check = "1011";
      this.userService.getDataByKeywordAndState(this.keyword, this.state).subscribe(data => { this.users = data; });
    }
    else if (this.keyword != "" && this.state == "" && this.city != "" && this.categories == "" && this.sortValue == "1") {
      this.check = "0111";
      this.userService.getDataByKeywordAndCity(this.keyword, this.city).subscribe(data => { this.users = data; });
    }
    else if (this.keyword != "" && this.state == "" && this.city == "" && this.categories != "" && this.sortValue == "1") {
      this.check = "1111";
      this.userService.getDataByKeywordAndCategories(this.keyword, this.categories).subscribe(data => { this.users = data; });
    }
    else if (this.keyword = "" && this.state != "" && this.city != "" && this.categories == "" && this.sortValue == "1") {
      this.check = "0101";
      this.userService.getDataByStateAndCity(this.state,this.city).subscribe(data => { this.users = data; });
    }
    else if (this.keyword = "" && this.state != "" && this.city == "" && this.categories != "" && this.sortValue == "1") {
      this.check = "0011";
      this.userService.getDataByStateAndCategories(this.state,this.categories).subscribe(data => { this.users = data; });
    }
    else if (this.keyword = "" && this.state == "" && this.city != "" && this.categories != "" && this.sortValue == "1") {
      this.check = "1101";
      this.userService.getDataByCityAndCategories(this.city,this.categories).subscribe(data => { this.users = data; });
    }
    else if (this.keyword != "" && this.state != "" && this.city != "" && this.categories == "" && this.sortValue == "1") {
      this.check = "1011";
      this.userService.getDataByKeywordStateAndCity(this.keyword,this.state,this.city).subscribe(data => { this.users = data; });
    }
    else if (this.keyword != "" && this.state != "" && this.city == "" && this.categories != "" && this.sortValue == "1") {
      this.check = "0111";
      this.userService.getDataByKeywordStateAndCategories(this.keyword, this.state, this.categories).subscribe(data => { this.users = data; });
    }
    else if (this.keyword == "" && this.state != "" && this.city != "" && this.categories != "" && this.sortValue == "1") {
      this.check = "1111";
      this.userService.getDataByStateCityAndCategories(this.state, this.city, this.categories).subscribe(data => { this.users = data; });
    }
    else if (this.keyword != "" && this.state != "" && this.city != "" && this.categories != "" && this.sortValue == "1") {
      this.check = "1101";
      this.userService.getDataByKeywordStateCityAndCategories(this.keyword,this.state,this.city,this.categories).subscribe(data => { this.users = data; });
    }
   


    // sorting ascending-------------------------------------------------------------

   /* else if (this.city != "" && this.restaurant == "" && this.pizza == "" && this.sortValue == "2") {
      console.log("sort = " + this.sortValue);
      this.check = "1002";
      this.userService.getDataByCitySortA(this.city).subscribe(data => { this.users = data; });
    }
    else if (this.city == "" && this.restaurant != "" && this.pizza == "" && this.sortValue == "2") {
      this.check = "0102";
      this.userService.getDataByRestaurantSortA(this.restaurant).subscribe(data => { this.users = data; });
    }
    else if (this.city == "" && this.restaurant == "" && this.pizza != "" && this.sortValue == "2") {
      this.check = "0012";
      this.userService.getDataByPizzaSortA(this.pizza).subscribe(data => { this.users = data; });
    }
    else if (this.city != "" && this.restaurant != "" && this.pizza == "" && this.sortValue == "2") {
      this.check = "1102";
      this.userService.getDataByCityAndRestaurantSortA(this.city, this.restaurant).subscribe(data => { this.users = data; });
    }
    else if (this.city != "" && this.restaurant == "" && this.pizza != "" && this.sortValue == "2") {
      this.check = "1012";
      this.userService.getDataByCityAndPizzaSortA(this.city, this.pizza).subscribe(data => { this.users = data; });
    }
    else if (this.city == "" && this.restaurant != "" && this.pizza != "" && this.sortValue == "2") {
      this.check = "0112";
      this.userService.getDataByRestaurantAndPizzaSortA(this.restaurant, this.pizza).subscribe(data => { this.users = data; });
    }
    else if (this.city != "" && this.restaurant != "" && this.pizza != "" && this.sortValue == "2") {
      this.check = "1112";
      this.userService.getDataByCityRestaurantAndPizzaSortA(this.city, this.restaurant, this.pizza).subscribe(data => { this.users = data; });
    }

    // sorting descending-----------------------------------------------------------

    else if (this.city != "" && this.restaurant == "" && this.pizza == "" && this.sortValue == "3") {
      console.log("sort = " + this.sortValue);
      this.check = "1003";
      this.userService.getDataByCitySortD(this.city).subscribe(data => { this.users = data; });
    }
    else if (this.city == "" && this.restaurant != "" && this.pizza == "" && this.sortValue == "3") {
      this.check = "0103";
      this.userService.getDataByRestaurantSortD(this.restaurant).subscribe(data => { this.users = data; });
    }
    else if (this.city == "" && this.restaurant == "" && this.pizza != "" && this.sortValue == "3") {
      this.check = "0013";
      this.userService.getDataByPizzaSortD(this.pizza).subscribe(data => { this.users = data; });
    }
    else if (this.city != "" && this.restaurant != "" && this.pizza == "" && this.sortValue == "3") {
      this.check = "1103";
      this.userService.getDataByCityAndRestaurantSortD(this.city, this.restaurant).subscribe(data => { this.users = data; });
    }
    else if (this.city != "" && this.restaurant == "" && this.pizza != "" && this.sortValue == "3") {
      this.check = "1013";
      this.userService.getDataByCityAndPizzaSortD(this.city, this.pizza).subscribe(data => { this.users = data; });
    }
    else if (this.city == "" && this.restaurant != "" && this.pizza != "" && this.sortValue == "3") {
      this.check = "0113";
      this.userService.getDataByRestaurantAndPizzaSortD(this.restaurant, this.pizza).subscribe(data => { this.users = data; });
    }
    else if (this.city != "" && this.restaurant != "" && this.pizza != "" && this.sortValue == "3") {
      this.check = "1113";
      this.userService.getDataByCityRestaurantAndPizzaSortD(this.city, this.restaurant, this.pizza).subscribe(data => { this.users = data; });
    }*/
  }


  key: string = 'default'; //set default
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  //initializing p to one
  p: number = 1;
}
