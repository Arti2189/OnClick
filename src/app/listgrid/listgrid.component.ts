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
  check: string = "000";

  // sort:string = "";
  sortValue: string = "1";


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

    // without sorting---------------------------------------------------

    if (this.keyword != "" && this.state == "" && this.city == "" && this.categories == "" && this.sortValue == "1") {
      this.check = "10001";
      this.userService.getDataByKeyword(this.keyword).subscribe(data => { this.users = data; });
    }
    else if (this.keyword == "" && this.state != "" && this.city == "" && this.categories == "" && this.sortValue == "1") {
      this.check = "01001";
      this.userService.getDataByState(this.state).subscribe(data => { this.users = data; });
    }
    else if (this.keyword == "" && this.state == "" && this.city != "" && this.categories == "" && this.sortValue == "1") {
      this.check = "00101";
      this.userService.getDataByCity(this.city).subscribe(data => { this.users = data; });
    }
    else if (this.keyword == "" && this.state == "" && this.city == "" && this.categories != "" && this.sortValue == "1") {
      this.check = "00011";
      this.userService.getDataByCategories(this.categories).subscribe(data => { this.users = data; });
    }
    else if (this.keyword != "" && this.state != "" && this.city == "" && this.categories == "" && this.sortValue == "1") {
      this.check = "11001";
      this.userService.getDataByKeywordAndState(this.keyword, this.state).subscribe(data => { this.users = data; });
    }
    else if (this.keyword != "" && this.state == "" && this.city != "" && this.categories == "" && this.sortValue == "1") {
      this.check = "10101";
      this.userService.getDataByKeywordAndCity(this.keyword, this.city).subscribe(data => { this.users = data; });
    }
    else if (this.keyword != "" && this.state == "" && this.city == "" && this.categories != "" && this.sortValue == "1") {
      this.check = "10011";
      this.userService.getDataByKeywordAndCategories(this.keyword, this.categories).subscribe(data => { this.users = data; });
    }
    else if (this.keyword == "" && this.state != "" && this.city != "" && this.categories == "" && this.sortValue == "1") {
      this.check = "01101";
      this.userService.getDataByStateAndCity(this.state, this.city).subscribe(data => { this.users = data; });
    }
    else if (this.keyword == "" && this.state != "" && this.city == "" && this.categories != "" && this.sortValue == "1") {
      this.check = "01011";
      this.userService.getDataByStateAndCategories(this.state, this.categories).subscribe(data => { this.users = data; });
    }
    else if (this.keyword == "" && this.state == "" && this.city != "" && this.categories != "" && this.sortValue == "1") {
      this.check = "00111";
      this.userService.getDataByCityAndCategories(this.city, this.categories).subscribe(data => { this.users = data; });
    }
    else if (this.keyword != "" && this.state != "" && this.city != "" && this.categories == "" && this.sortValue == "1") {
      this.check = "11101";
      this.userService.getDataByKeywordStateAndCity(this.keyword, this.state, this.city).subscribe(data => { this.users = data; });
    }
    else if (this.keyword != "" && this.state != "" && this.city == "" && this.categories != "" && this.sortValue == "1") {
      this.check = "11011";
      this.userService.getDataByKeywordStateAndCategories(this.keyword, this.state, this.categories).subscribe(data => { this.users = data; });
    }
    else if (this.keyword == "" && this.state != "" && this.city != "" && this.categories != "" && this.sortValue == "1") {
      this.check = "01111";
      this.userService.getDataByStateCityAndCategories(this.state, this.city, this.categories).subscribe(data => { this.users = data; });
    }
    else if (this.keyword != "" && this.state != "" && this.city != "" && this.categories != "" && this.sortValue == "1") {
      this.check = "11111";
      this.userService.getDataByKeywordStateCityAndCategories(this.keyword, this.state, this.city, this.categories).subscribe(data => { this.users = data; });
    }

    //sorting high to low---------------------------------------------

    else if (this.keyword != "" && this.state == "" && this.city == "" && this.categories == "" && this.sortValue == "2") {
      this.check = "10002";
      this.userService.getDataByKeywordH(this.keyword).subscribe(data => { this.users = data; });
    }
    else if (this.keyword == "" && this.state != "" && this.city == "" && this.categories == "" && this.sortValue == "2") {
      this.check = "01002";
      this.userService.getDataByStateH(this.state).subscribe(data => { this.users = data; });
    }
    else if (this.keyword == "" && this.state == "" && this.city != "" && this.categories == "" && this.sortValue == "2") {
      this.check = "00102";
      this.userService.getDataByCityH(this.city).subscribe(data => { this.users = data; });
    }
    else if (this.keyword == "" && this.state == "" && this.city == "" && this.categories != "" && this.sortValue == "2") {
      this.check = "00012";
      this.userService.getDataByCategoriesH(this.categories).subscribe(data => { this.users = data; });

    }
    else if (this.keyword != "" && this.state != "" && this.city == "" && this.categories == "" && this.sortValue == "2") {
      this.check = "11002";
      this.userService.getDataByKeywordAndStateH(this.keyword, this.state).subscribe(data => { this.users = data; });
    }
    else if (this.keyword != "" && this.state == "" && this.city != "" && this.categories == "" && this.sortValue == "2") {
      this.check = "10102";
      this.userService.getDataByKeywordAndCityH(this.keyword, this.city).subscribe(data => { this.users = data; });
    }
    else if (this.keyword != "" && this.state == "" && this.city == "" && this.categories != "" && this.sortValue == "2") {
      this.check = "10012";
      this.userService.getDataByKeywordAndCategoriesH(this.keyword, this.categories).subscribe(data => { this.users = data; });
    }
    else if (this.keyword == "" && this.state != "" && this.city != "" && this.categories == "" && this.sortValue == "2") {
      this.check = "01102";
      this.userService.getDataByStateAndCityH(this.state, this.city).subscribe(data => { this.users = data; });
    }
    else if (this.keyword == "" && this.state != "" && this.city == "" && this.categories != "" && this.sortValue == "2") {
      this.check = "01012";
      this.userService.getDataByStateAndCategoriesH(this.state, this.categories).subscribe(data => { this.users = data; });
    }
    else if (this.keyword == "" && this.state == "" && this.city != "" && this.categories != "" && this.sortValue == "2") {
      this.check = "00112";
      this.userService.getDataByCityAndCategoriesH(this.city, this.categories).subscribe(data => { this.users = data; });
    }
    else if (this.keyword != "" && this.state != "" && this.city != "" && this.categories == "" && this.sortValue == "2") {
      this.check = "11102";
      this.userService.getDataByKeywordStateAndCityH(this.keyword, this.state, this.city).subscribe(data => { this.users = data; });
    }
    else if (this.keyword != "" && this.state != "" && this.city == "" && this.categories != "" && this.sortValue == "2") {
      this.check = "11012";
      this.userService.getDataByKeywordStateAndCategoriesH(this.keyword, this.state, this.categories).subscribe(data => { this.users = data; });
    }
    else if (this.keyword == "" && this.state != "" && this.city != "" && this.categories != "" && this.sortValue == "2") {
      this.check = "01112";
      this.userService.getDataByStateCityAndCategoriesH(this.state, this.city, this.categories).subscribe(data => { this.users = data; });
    }
    else if (this.keyword != "" && this.state != "" && this.city != "" && this.categories != "" && this.sortValue == "2") {
      this.check = "11112";
      this.userService.getDataByKeywordStateCityAndCategoriesH(this.keyword, this.state, this.city, this.categories).subscribe(data => { this.users = data; });
    }

    //sorting low to high -------------------------------------------------------------
    else if (this.keyword != "" && this.state == "" && this.city == "" && this.categories == "" && this.sortValue == "3") {
      this.check = "10003";
      this.userService.getDataByKeywordL(this.keyword).subscribe(data => { this.users = data; });
    }
    else if (this.keyword == "" && this.state != "" && this.city == "" && this.categories == "" && this.sortValue == "3") {
      this.check = "01003";
      this.userService.getDataByStateL(this.state).subscribe(data => { this.users = data; });
    }
    else if (this.keyword == "" && this.state == "" && this.city != "" && this.categories == "" && this.sortValue == "3") {
      this.check = "00103";
      this.userService.getDataByCityL(this.city).subscribe(data => { this.users = data; });
    }
    else if (this.keyword == "" && this.state == "" && this.city == "" && this.categories != "" && this.sortValue == "3") {
      this.check = "00013";
      this.userService.getDataByCategoriesL(this.categories).subscribe(data => { this.users = data; });
    }
    else if (this.keyword != "" && this.state != "" && this.city == "" && this.categories == "" && this.sortValue == "3") {
      this.check = "11003";
      this.userService.getDataByKeywordAndStateL(this.keyword, this.state).subscribe(data => { this.users = data; });
    }
    else if (this.keyword != "" && this.state == "" && this.city != "" && this.categories == "" && this.sortValue == "3") {
      this.check = "10103";
      this.userService.getDataByKeywordAndCityL(this.keyword, this.city).subscribe(data => { this.users = data; });
    }
    else if (this.keyword != "" && this.state == "" && this.city == "" && this.categories != "" && this.sortValue == "3") {
      this.check = "10013";
      this.userService.getDataByKeywordAndCategoriesL(this.keyword, this.categories).subscribe(data => { this.users = data; });
    }
    else if (this.keyword == "" && this.state != "" && this.city != "" && this.categories == "" && this.sortValue == "3") {
      this.check = "01103";
      this.userService.getDataByStateAndCityL(this.state, this.city).subscribe(data => { this.users = data; });
    }
    else if (this.keyword == "" && this.state != "" && this.city == "" && this.categories != "" && this.sortValue == "3") {
      this.check = "01013";
      this.userService.getDataByStateAndCategoriesL(this.state, this.categories).subscribe(data => { this.users = data; });
    }
    else if (this.keyword == "" && this.state == "" && this.city != "" && this.categories != "" && this.sortValue == "3") {
      this.check = "00113";
      this.userService.getDataByCityAndCategoriesL(this.city, this.categories).subscribe(data => { this.users = data; });
    }
    else if (this.keyword != "" && this.state != "" && this.city != "" && this.categories == "" && this.sortValue == "3") {
      this.check = "11103";
      this.userService.getDataByKeywordStateAndCityL(this.keyword, this.state, this.city).subscribe(data => { this.users = data; });
    }
    else if (this.keyword != "" && this.state != "" && this.city == "" && this.categories != "" && this.sortValue == "3") {
      this.check = "11013";
      this.userService.getDataByKeywordStateAndCategoriesL(this.keyword, this.state, this.categories).subscribe(data => { this.users = data; });
    }
    else if (this.keyword == "" && this.state != "" && this.city != "" && this.categories != "" && this.sortValue == "3") {
      this.check = "01113";
      this.userService.getDataByStateCityAndCategoriesL(this.state, this.city, this.categories).subscribe(data => { this.users = data; });
    }
    else if (this.keyword != "" && this.state != "" && this.city != "" && this.categories != "" && this.sortValue == "3") {
      this.check = "11113";
      this.userService.getDataByKeywordStateCityAndCategoriesL(this.keyword, this.state, this.city, this.categories).subscribe(data => { this.users = data; });
    }
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
