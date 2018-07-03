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
  id: string = '5b35d11456d7c65c346c3fc7';
  //id: any;
  userData: any;
  first: any = '';
  last: any = '';
  
 
  constructor(public navCtrl: NavController, private geolocation: Geolocation, private getUser: UserDataProvider) {
 
  }

  getUserData(){
    //this.id = sessionStorage.getItem('userId')
    console.log(this.id)
    //sessionStorage.getItem('userId');
    //let id = sessionStorage.getItem('userId');
    this.getUser.userData(this.id)
      .subscribe( (data) => {
        console.log('getUserData runs', data)
        this.userData = data
        this.first = this.userData.firstName
        this.last = this.userData.lastName
      })
  }
 
  /* WORKING TUTORIAL */
  ionViewDidLoad(){
    this.loadMap();
    //this.initMap();
  }


/*FOR PLACES MAP
  initMap() {
    console.log('initMap runs')
    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.866, lng: 151.196},
      zoom: 15
    });

    let infowindow = new google.maps.InfoWindow();
    let service = new google.maps.places.PlacesService(map);

    service.getDetails({
      placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
    }, function(place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        let marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
            'Place ID: ' + place.place_id + '<br>' +
            place.formatted_address + '</div>');
          infowindow.open(map, this);
        });
      }
    });
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

      /*FOR PLACES MAP
      let infowindow = new google.maps.InfoWindow();
      let service = new google.maps.places.PlacesService(this.map);

      service.getDetails({
        placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
      }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          let marker = new google.maps.Marker({
            map: this.map,
            position: place.geometry.location
          });
          google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
              'Place ID: ' + place.place_id + '<br>' +
              place.formatted_address + '</div>');
            infowindow.open(this.map, this);
          });
        }
      });
      */

    }, (err) => {
      console.log(err);
    });
 
  }

  
  //ADD MARKER FUNCTIONS 
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
  
}