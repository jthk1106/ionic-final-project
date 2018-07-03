import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserDataProvider {

  url: string = 'http://localhost:3000/api/appUsers/';
  //http://localhost:3000/api/appUsers/5b35d11456d7c65c346c3fc7

  constructor(public http: HttpClient) {
    
  }

  userData(id){
    return this.http.get(this.url+id, id)
  }
}
