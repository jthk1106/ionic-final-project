import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserRegisterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserRegisterProvider {

  url: string = 'http://localhost:3000/api/appUsers'

  constructor(public http: HttpClient) {
    
  }

  register(user){
    console.log('register provider runs', user)
    return this.http.post(this.url, user)
  }
}
