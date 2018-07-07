import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { UserDataProvider } from '../../providers/user-data/user-data';
 
declare var google;
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  now: any;
  //id: string = '5b35d11456d7c65c346c3fc7';
  id: any;
  userData: any;
  first: any = '';
  last: any = '';
  infowindow: any;

 
  constructor(public navCtrl: NavController, private geolocation: Geolocation, private getUser: UserDataProvider) {

  }

  getUserData(){
    //this.id = sessionStorage.getItem('userId')
    console.log('getUserData runs', this.id)
    this.getUser.userData(this.id)
      .subscribe( (data) => {
        console.log('getUser provider runs from getUserData', data)
        this.userData = data
        this.first = this.userData.firstName
        this.last = this.userData.lastName
      })
  }
 
  // WORKING TUTORIAL
  ionViewDidLoad(){
    this.loadMap();
    this.id = sessionStorage.getItem('userId')
    if(this.id){
      return this.getUserData()
    }
    //this.initMap();
  }

/*FOR PLACES MAP
  initMap() {
    console.log('initMap runs')

    let latLng = new google.maps.latLng(32.7157, 117.1611);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }
*/

  // WORKING TUTORIAL 
  loadMap(){
    console.log('loadMap() runs')
    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.now = latLng;
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }, (err) => {
      console.log(err);
    });
 
  }

  places() {
    let pyrmont = {lat: -33.867, lng: 151.195};

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

    this.infowindow = new google.maps.InfoWindow();
    let service = new google.maps.places.PlacesService(this.map);
    service.nearbySearch({
      location: pyrmont,
      radius: 500,
      type: ['store']
    }, this.callback);
  }

  callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        this.createMarker(results[i]);
      }
    }
  }

  createMarker(place) {
    let placeLoc = place.geometry.location;
    let marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      this.infowindow.setContent(place.name);
      this.infowindow.open(this.map, this);
    });
  }
  
  /*ADD MARKER FUNCTIONS 
  addMarker(){
  
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.now //this.map.getCenter()
    });

    let content = "<h4>You Are Here!</h4>";         

    this.addInfoWindow(marker, content);
    
  }

  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }
  */
}