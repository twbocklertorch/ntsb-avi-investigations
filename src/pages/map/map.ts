import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { EventListService } from '../../services/event-list.service';
import { Event } from '../../model/event/event.model';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  eventList: Observable<Event[]>;
  //itemsPerPage: number;
  eventsArr = [];
  allEvents = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventListService: EventListService) {
    //this.itemsPerPage = 30;
  }

  ionViewDidLoad() {
    this.loadMap();
    this.loadEventsOnMap();
  }

  loadMap(){
 
    let latLng = new google.maps.LatLng(39.8283, -98.5795);
 
    let mapOptions = {
      center: latLng,
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    //this.addMarker();
 
  }

  loadEventsOnMap() {
    
    this.eventListService.getEventList().valueChanges().subscribe(events => {
      let latLng: any;
      
      for (let i = 0; i < events.length; i++) {
        //if (events[i].ev_)
        this.eventsArr.push(events[i]);

        latLng = this.lookupLatLng(events[i].ev_city, events[i].ev_state, events[i].ev_site_zipcode);
        this.addMarker(latLng);

        // if (events[i].latitude && events[i].longitude) {
        //   if (events[i].latitude != '0' && events[i].longitude != '0') {
        //     this.addMarker(events[i].latitude, events[i].longitude);
        //   }
        // }
      }
      //console.log(this.aircraftArr);
      this.allEvents = this.eventsArr;
    });
  }

  addMarker(latLng){
 
    // let latDir = lati.substr(lati.length-1);
    // let latCoor = lati.substr(0,lati.indexOf(latDir));

    // let lngDir = lngi.substr(lngi.length-1);
    // let lngCoor = lngi.substr(0,lngi.indexOf(lngDir));

    // let finalLat = 0;
    // let finalLng = 0;

    // if (latDir == 'S') {
    //   latCoor = '-' + latCoor;
    // }
    // finalLat = parseInt(latCoor);

    // if (lngDir == 'W') {
    //   lngCoor = '-' + lngCoor;
    // }
    // finalLng = parseInt(lngCoor);

    //let latLng = new google.maps.LatLng({lat: finalLat, lng: finalLng});

    //let latLng = this.lookupLatLng();

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
      //position: this.map.getCenter()
    });
   
    let content = "<h4>Information!</h4>";         
 
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

  lookupLatLng(city, state, zip) {
    let fullAddr = city + ', ' + state + '  ' + zip;
    let geocoder = new google.maps.Geocoder();
    let latLng: any;

    geocoder.geocode({ address: fullAddr }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var finalLat = results[0].geometry.location.lat();
            var finalLng = results[0].geometry.location.lng();

            latLng = new google.maps.LatLng({lat: finalLat, lng: finalLng})
        }

    });
    return latLng;
}

}