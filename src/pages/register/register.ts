import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UserRegisterProvider } from '../../providers/user-register/user-register';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [UserRegisterProvider]
})
export class RegisterPage {

  registerUser: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public registerProvider: UserRegisterProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {
    console.log('register page run', this.registerUser)
    this.registerProvider.register(this.registerUser)
      .subscribe( (data:any) => {
        console.log("register response", data);
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('userId', data.userId);
      })
  }

  goHome() {
    this.navCtrl.setRoot(HomePage);
  }

}
