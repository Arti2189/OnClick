import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:3001/';
  getUsers() {
    return this.http.get<any>(this.baseUrl);
  }

  getDetails(id: string): Observable<any> {
    return this.http.get(this.baseUrl + id);
  }
   
  /*********************** insert contact us ***********************/
  insertContact(yourName: string, Email: string, Subject: string, Message: string): Observable<any> {
    return this.http.get(this.baseUrl + "contactus/" + yourName + "/" + Email + "/" + Subject + "/" + Message);
  }
  /****************************** Register User ***********************/
  register(username: string, emailaddress: string, password: string, confirmpassword: string): Observable<any> {
    return this.http.get(this.baseUrl + "register/" + username + "/" + emailaddress + "/" + password + "/" + confirmpassword);
  }
  /****************************  Login User   **************************/
  loginUser(username: string,password: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "login/" + username+ "/" + password);
  }
 
  /**************************  Insert Review ******************************* */
  insertReview(yourName: string, Email: string, Category: string, Message: string): Observable<any> {
    return this.http.get(this.baseUrl + "review/" + yourName + "/" + Email + "/" + Category + "/" + Message);
  }
  /************************** Get Reviews  ***********************/
  getReviews() {
    return this.http.get<any>(this.baseUrl+"getreviews/pages");
  }

  //without sorting---------------------------------------------------------
  
  /************************** when only keyword is searched  ***********************/
  getDataByKeyword(keyword: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword/" + keyword);
  }

  /**************************  when only state is searched  ***********************/
  getDataByState(state: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "state/" + state);
  }

  /**************************  when only city is searched  ***********************/
  getDataByCity(city: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "city/" + city);
  }

  /**************************  when only categories is searched  ***********************/
  getDataByCategories(categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "categories/" + categories);
  }

  /**************************  when only keyword and state is searched  ***********************/
  getDataByKeywordAndState(keyword: string, state: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_state/" + keyword + "/" + state);
  }

  /**************************  when only keyword and city is searched  ***********************/
  getDataByKeywordAndCity(keyword: string, city: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_city/" + keyword + "/" + city);
  }

  /**************************  when only keyword and categories is searched  ***********************/
  getDataByKeywordAndCategories(keyword: string, categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_categories/" + keyword + "/" + categories);
  }

  /************************** when only state and city is searched  ***********************/
  getDataByStateAndCity(state: string, city: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "state_city/" + state + "/" + city);
  }

  /************************** when only state and categories is searched  ***********************/
  getDataByStateAndCategories(state: string, categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "state_categories/" + state + "/" + categories);
  }

  /************************** when only city and categories is searched  ***********************/
  getDataByCityAndCategories(city: string, categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "city_categories/" + city + "/" + categories);
  }

  /************************** when only keyword,state and city is searched  ***********************/
  getDataByKeywordStateAndCity(keyword: string, state: string, city: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_state_city/" + keyword + "/" + state + "/" + city);
  }

  /************************** when only keyword,state and categories is searched  ***********************/
  getDataByKeywordStateAndCategories(keyword: string, state: string, categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_state_categories/" + keyword + "/" + state + "/" + categories);
  }

  /************************** when only keyword,state and city and categories is searched  ***********************/
  getDataByKeywordCityAndCategories(keyword: string, city: string, categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_city_categories/" + keyword + "/" + city + "/" + categories);
  }

  /************************** when only state and city  and categories is searched  ***********************/
  getDataByStateCityAndCategories(state: string, city: string, categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "state_city_categories/" + state + "/" + city + "/" + categories);
  }

  /************************** when only keyword,state and city and categories is searched  ***********************/
  getDataByKeywordStateCityAndCategories(keyword: string, state: string, city: string, categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_state_city_categories/" + keyword + "/" + state + "/" + city + "/" + categories);
  }

  // sorting from high to low

  /************************** when only keyword is searched  ***********************/
  getDataByKeywordH(keyword: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_high_to_low/" + keyword);
  }

  /************************** when only state  is searched  ***********************/
  getDataByStateH(state: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "state_high_to_low/" + state);
  }

  /************************** when only   city  is searched  ***********************/
  getDataByCityH(city: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "city_high_to_low/" + city);
  }

  /************************** when only  categories is searched  ***********************/
  getDataByCategoriesH(categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "categories_high_to_low/" + categories);
  }

  /************************** when only keyword,state  is searched  ***********************/
  getDataByKeywordAndStateH(keyword: string, state: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_state_high_to_low/" + keyword + "/" + state);
  }

  /************************** when only keyword and city  is searched  ***********************/
  getDataByKeywordAndCityH(keyword: string, city: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_city_high_to_low/" + keyword + "/" + city);
  }

  /************************** when only keyword and categories is searched  ***********************/
  getDataByKeywordAndCategoriesH(keyword: string, categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_categories_high_to_low/" + keyword + "/" + categories);
  }

  /************************** when only state and city  is searched  ***********************/
  getDataByStateAndCityH(state: string, city: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "state_city_high_to_low/" + state + "/" + city);
  }

  /************************** when only state and categories is searched  ***********************/
  getDataByStateAndCategoriesH(state: string, categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "state_categories_high_to_low/" + state + "/" + categories);
  }

  /************************** when only city and categories is searched  ***********************/
  getDataByCityAndCategoriesH(city: string, categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "city_categories_high_to_low/" + city + "/" + categories);
  }

  /************************** when only keyword,state and city  is searched  ***********************/
  getDataByKeywordStateAndCityH(keyword: string, state: string, city: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_state_city_high_to_low/" + keyword + "/" + state + "/" + city);
  }

  /************************** when only keyword,state and categories is searched  ***********************/
  getDataByKeywordStateAndCategoriesH(keyword: string, state: string, categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_state_categories_high_to_low/" + keyword + "/" + state + "/" + categories);
  }

  /************************** when only keyword and city and categories is searched  ***********************/
  getDataByKeywordCityAndCategoriesH(keyword: string, city: string, categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_city_categories_high_to_low/" + keyword + "/" + city + "/" + categories);
  }

  /************************** when only state and city and categories is searched  ***********************/
  getDataByStateCityAndCategoriesH(state: string, city: string, categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "state_city_categories_high_to_low/" + state + "/" + city + "/" + categories);
  }

  /************************** when only keyword,state and city and categories is searched  ***********************/
  getDataByKeywordStateCityAndCategoriesH(keyword: string, state: string, city: string, categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_state_city_categories_high_to_low/" + keyword + "/" + state + "/" + city + "/" + categories);
  }


  //sort from low to high

  /************************** when only keyword is searched  ***********************/
  getDataByKeywordL(keyword: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_low_to_high/" + keyword);
  }

  /************************** when only state  is searched  ***********************/
  getDataByStateL(state: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "state_low_to_high/" + state);
  }

  /************************** when only city is searched  ***********************/
  getDataByCityL(city: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "city_low_to_high/" + city);
  }

  /************************** when only  categories is searched  ***********************/
  getDataByCategoriesL(categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "categories_low_to_high/" + categories);
  }

  /************************** when only keyword,state  is searched  ***********************/
  getDataByKeywordAndStateL(keyword: string, state: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_state_low_to_high/" + keyword + "/" + state);
  }

  /************************** when only keyword and city is searched  ***********************/
  getDataByKeywordAndCityL(keyword: string, city: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_city_low_to_high/" + keyword + "/" + city);
  }

  /************************** when only keyword and categories is searched  ***********************/
  getDataByKeywordAndCategoriesL(keyword: string, categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_categories_low_to_high/" + keyword + "/" + categories);
  }

  /************************** when only state and city  is searched  ***********************/
  getDataByStateAndCityL(state: string, city: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "state_city_low_to_high/" + state + "/" + city);
  }

  /************************** when only state and categories is searched  ***********************/
  getDataByStateAndCategoriesL(state: string, categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "state_categories_low_to_high/" + state + "/" + categories);
  }

  /************************** when only and city and categories is searched  ***********************/
  getDataByCityAndCategoriesL(city: string, categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "city_categories_low_to_high/" + city + "/" + categories);
  }

  /************************** when only keyword,state and city  is searched  ***********************/
  getDataByKeywordStateAndCityL(keyword: string, state: string, city: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_state_city_low_to_high/" + keyword + "/" + state + "/" + city);
  }

  /************************** when only keyword,state and categories is searched  ***********************/
  getDataByKeywordStateAndCategoriesL(keyword: string, state: string, categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_state_categories_low_to_high/" + keyword + "/" + state + "/" + categories);
  }

  /************************** when only keyword and city and categories is searched  ***********************/
  getDataByKeywordCityAndCategoriesL(keyword: string, city: string, categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_city_categories_low_to_high/" + keyword + "/" + city + "/" + categories);
  }

  /************************** when only state and city and categories is searched  ***********************/
  getDataByStateCityAndCategoriesL(state: string, city: string, categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "state_city_categories_low_to_high/" + state + "/" + city + "/" + categories);
  }

  /************************** when only keyword,state and city and categories is searched  ***********************/
  getDataByKeywordStateCityAndCategoriesL(keyword: string, state: string, city: string, categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_state_city_categories_low_to_high/" + keyword + "/" + state + "/" + city + "/" + categories);
  }
}
