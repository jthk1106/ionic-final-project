import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UserLoginProvider } from '../../providers/user-login/user-login';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UserLoginProvider]
})
export class LoginPage {

  loginUser: any = {
    email: '',
    password: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginProvider: UserLoginProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    console.log('login page run', this.loginUser)
    this.loginProvider.login(this.loginUser)
      .subscribe( (data:any) => {
        console.log("login response", data);
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('userId', data.userId);
      })
  }

  goHome() {
    this.navCtrl.setRoot(HomePage);
  }
}
