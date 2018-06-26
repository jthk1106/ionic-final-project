import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapProvider } from '../../providers/map/map';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  @ViewChild('map') mapElement;
  location: any = '';
  map: any;
  infowindow: any;

  constructor(public navCtrl: NavController, private geolocation: MapProvider) {

  }

  ionViewDidLoad(){
  
    setTimeout(()=>{ this.initMap(); },100);
  }

  initMap() {
    
    let latLng = new google.maps.LatLng(32.715736, -117.161087);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    /*
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
      type: 'store'
    }, this.callback);
  }

  callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
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
    */
  }

  ngOnInit() {
    function locate(){
      console.log('locate() from home', this.locate)
      return this.geolocation.find()
    }
  }
}


/*
var map;
  var infowindow;

  function initMap() {
    var pyrmont = {lat: -33.867, lng: 151.195};

    map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: pyrmont,
      radius: 500,
      type: ['store']
    }, callback);
  }

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }

  search(){
    console.log('search function', this.location)
  }
*/