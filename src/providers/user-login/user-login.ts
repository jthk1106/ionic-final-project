import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserLoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserLoginProvider {

  url: string = 'http://localhost:3000/api/appUsers/login'

  constructor(public http: HttpClient) {
    
  }

  login(user){
    console.log('login provider runs', user)
    return this.http.post(this.url, user)
  }
}
