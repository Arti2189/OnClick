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

  insertContact(yourName: string, Email: string, Subject: string, Message: string): Observable<any> {
    return this.http.get(this.baseUrl + yourName + "/" + Email + "/" + Subject + "/" + Message);
  }

  validateContact(contact) {
    if (contact.yourName == undefined || contact.Email == undefined || contact.Subject == undefined || contact.Message == undefined) {
      return false;
    }
    else {
      return true;
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  //without sorting---------------------------------------------------------

  getDataByKeyword(keyword: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword/" + keyword);
  }
  getDataByState(state: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "state/" + state);
  }
  getDataByCity(city: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "city/" + city);
  }
  getDataByCategories(categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "categories/" + categories);
  }
  getDataByKeywordAndState(keyword: string, state: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_state/" + keyword + "/" + state);
  }
  getDataByKeywordAndCity(keyword: string, city: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_city/" + keyword + "/" + city);
  }
  getDataByKeywordAndCategories(keyword: string, categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_categories/" + keyword + "/" + categories);
  }
  getDataByStateAndCity(state: string, city: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "state_city/" + state + "/" + city);
  }
  getDataByStateAndCategories(state: string, categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "state_categories/" + state + "/" + categories);
  }
  getDataByCityAndCategories(city: string, categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "city_categories/" + city + "/" + categories);
  }
  getDataByKeywordStateAndCity(keyword: string, state: string, city: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_state_city/" + keyword + "/" + state + "/" + city);
  }
  getDataByKeywordStateAndCategories(keyword: string, state: string, categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_state_categories/" + keyword + "/" + state + "/" + categories);
  }

  getDataByKeywordCityAndCategories(keyword: string, city: string, categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_city_categories/" + keyword + "/" + city + "/" + categories);
  }
  getDataByStateCityAndCategories(state: string,city: string, categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "state_city_categories/" + state + "/" + city + "/" + categories);
  }
  getDataByKeywordStateCityAndCategories(keyword: string, state: string,city: string, categories: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "keyword_state_city_categories/" + keyword + "/" + state + "/" + city + "/" + categories);
  }

// sorting from high to low

getDataByKeywordH(keyword: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "keyword_high_to_low/" + keyword);
}
getDataByStateH(state: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "state_high_to_low/" + state);
}
getDataByCityH(city: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "city_high_to_low/" + city);
}
getDataByCategoriesH(categories: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "categories_high_to_low/" + categories);
}
getDataByKeywordAndStateH(keyword: string, state: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "keyword_state_high_to_low/" + keyword + "/" + state);
}
getDataByKeywordAndCityH(keyword: string, city: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "keyword_city_high_to_low/" + keyword + "/" + city);
}
getDataByKeywordAndCategoriesH(keyword: string, categories: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "keyword_categories_high_to_low/" + keyword + "/" + categories);
}
getDataByStateAndCityH(state: string, city: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "state_city_high_to_low/" + state + "/" + city);
}
getDataByStateAndCategoriesH(state: string, categories: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "state_categories_high_to_low/" + state + "/" + categories);
}
getDataByCityAndCategoriesH(city: string, categories: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "city_categories_high_to_low/" + city + "/" + categories);
}
getDataByKeywordStateAndCityH(keyword: string, state: string, city: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "keyword_state_city_high_to_low/" + keyword + "/" + state + "/" + city);
}
getDataByKeywordStateAndCategoriesH(keyword: string, state: string, categories: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "keyword_state_categories_high_to_low/" + keyword + "/" + state + "/" + categories);
}

getDataByKeywordCityAndCategoriesH(keyword: string, city: string, categories: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "keyword_city_categories_high_to_low/" + keyword + "/" + city + "/" + categories);
}
getDataByStateCityAndCategoriesH(state: string,city: string, categories: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "state_city_categories_high_to_low/" + state + "/" + city + "/" + categories);
}
getDataByKeywordStateCityAndCategoriesH(keyword: string, state: string,city: string, categories: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "keyword_state_city_categories_high_to_low/" + keyword + "/" + state + "/" + city + "/" + categories);
}


//sort from low to high

getDataByKeywordL(keyword: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "keyword_low_to_high/" + keyword);
}
getDataByStateL(state: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "state_low_to_high/" + state);
}
getDataByCityL(city: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "city_low_to_high/" + city);
}
getDataByCategoriesL(categories: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "categories_low_to_high/" + categories);
}
getDataByKeywordAndStateL(keyword: string, state: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "keyword_state_low_to_high/" + keyword + "/" + state);
}
getDataByKeywordAndCityL(keyword: string, city: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "keyword_city_low_to_high/" + keyword + "/" + city);
}
getDataByKeywordAndCategoriesL(keyword: string, categories: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "keyword_categories_low_to_high/" + keyword + "/" + categories);
}
getDataByStateAndCityL(state: string, city: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "state_city_low_to_high/" + state + "/" + city);
}
getDataByStateAndCategoriesL(state: string, categories: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "state_categories_low_to_high/" + state + "/" + categories);
}
getDataByCityAndCategoriesL(city: string, categories: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "city_categories_low_to_high/" + city + "/" + categories);
}
getDataByKeywordStateAndCityL(keyword: string, state: string, city: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "keyword_state_city_low_to_high/" + keyword + "/" + state + "/" + city);
}
getDataByKeywordStateAndCategoriesL(keyword: string, state: string, categories: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "keyword_state_categories_low_to_high/" + keyword + "/" + state + "/" + categories);
}

getDataByKeywordCityAndCategoriesL(keyword: string, city: string, categories: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "keyword_city_categories_low_to_high/" + keyword + "/" + city + "/" + categories);
}
getDataByStateCityAndCategoriesL(state: string,city: string, categories: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "state_city_categories_low_to_high/" + state + "/" + city + "/" + categories);
}
getDataByKeywordStateCityAndCategoriesL(keyword: string, state: string,city: string, categories: string): Observable<any> {
  return this.http.get<any>(this.baseUrl + "keyword_state_city_categories_low_to_high/" + keyword + "/" + state + "/" + city + "/" + categories);
}
}
