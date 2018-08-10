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
    //this.loadMap();
    //this.loadEventsOnMap();
    this.loadEventData();
  }

  loadEventData() {
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: new google.maps.LatLng(33.1972, -96.6398),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    this.eventListService.getEventList().valueChanges().subscribe(events => {
      //console.log(events);
      for (let i = 0; i < events.length; i++) {
        //console.log(events[i].ev_id);
        let isState = this.isUSAState(events[i].ev_state);

        if (isState) {
          let fullAddr = events[i].ev_city + ', ' + events[i].ev_state + '  ' + events[i].ev_site_zipcode;
          let zip = events[i].ev_site_zipcode;
  
          this.addMarker(map, events[i]);
        }
        }
      console.log('loop complete');
    });
  }

  addMarker(map, event){
    try {
        let fullAddr = event.ev_city + ', ' + event.ev_state + '  ' + event.ev_site_zipcode;
        //console.log(event.ev_id + ": " + fullAddr);
        let geocoder = new google.maps.Geocoder();
        let latLng: any;

        // Can't rely on clean NTSB data, so go find the lat/lng through geocode
        geocoder.geocode({ address: fullAddr }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var finalLat = results[0].geometry.location.lat();
                var finalLng = results[0].geometry.location.lng();

                latLng = new google.maps.LatLng({lat: finalLat, lng: finalLng})
                //console.log(latLng);

                let marker = new google.maps.Marker({
                  map: map,
                  animation: google.maps.Animation.DROP,
                  //position: new google.maps.LatLng(finalLat, finalLng),
                  position: latLng,
                });
              
                let content = "<h4>" + event.ev_city + ", " + event.ev_state + "</h4>";     
            
                let infoWindow = new google.maps.InfoWindow({
                  content: content
                });
              
                google.maps.event.addListener(marker, 'click', () => {
                  infoWindow.open(this.map, marker);
                });
              }

        });
    }
    catch(e) {
      console.log(e);
    }
  }

  isUSAState(state) {
    switch (state){
      case "AL":
      case "AK":
      case "AR":
      case "AZ":
      case "CA":
      case "CO":
      case "CT":
      case "DE":
      case "FL":
      case "GA":
      case "HI":
      case "ID":
      case "IL":
      case "IN":
      case "IA":
      case "KS":
      case "KY":
      case "LA":
      case "ME":
      case "MD":
      case "MA":
      case "MI":
      case "MN":
      case "MS":
      case "MO":
      case "MT":
      case "NE":
      case "NV":
      case "NH":
      case "NJ":
      case "NM":
      case "NY":
      case "NC":
      case "ND":
      case "OH":
      case "OK":
      case "OR":
      case "PA":
      case "RI":
      case "SC":
      case "SD":
      case "TN":
      case "TX":
      case "UT":
      case "VT":
      case "VA":
      case "WA":
      case "WV":
      case "WI":
      case "WY":
        return true;
      default:
        return false;
    }
  }

}

      //event.latitude, event.longitude
      // example: lat: 0973321N, lng: 2132132E
      /*
      let latDir = event.latitude.substr(event.latitude.length-1); // 'N'
      let latCoor = event.latitude.substr(0, event.latitude.indexOf(latDir)); // '97.656565

      let lngDir = event.longitude.substr(event.longitude.length-1); // 'W'
      let lngCoor = event.longitude.substr(0,event.longitude.indexOf(lngDir)); // '97.656565

      let finalLat = 0;
      let finalLng = 0;

      if (latDir == 'S') {
        latCoor = '-' + latCoor.substr(0,2) + '.' + latCoor.substr(3,latCoor.length);
      }
      else {
        latCoor = latCoor.substr(0,2) + '.' + latCoor.substr(3,latCoor.length);
      }
    
      if (lngDir == 'W') {
        lngCoor = '-' + lngCoor.substr(0,3) + '.' + lngCoor.substr(4,lngCoor.length);
      }
      else {
        lngCoor = lngCoor.substr(0,3) + '.' + lngCoor.substr(4,lngCoor.length);
      }

      finalLat = parseFloat(latCoor);
      finalLng = parseFloat(lngCoor);
      */
