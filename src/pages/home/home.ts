import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  location: any = ''

  constructor(public navCtrl: NavController) {

  }

  search(){
    console.log('search function', this.location)
  }
}
