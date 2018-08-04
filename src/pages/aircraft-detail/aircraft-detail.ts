import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Aircraft } from '../../model/aircraft/aircraft.model';
import { AircraftListService } from '../../services/aircraft-list.service';

@IonicPage()
@Component({
  selector: 'page-aircraft-detail',
  templateUrl: 'aircraft-detail.html',
})
export class AircraftDetailPage {
  aircraftList: Observable<Aircraft[]>

  aircraft_ev_id: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private aircraftListService: AircraftListService) {
      //this.event = new Event();

      this.aircraft_ev_id = this.navParams.get('aircraft_ev_id');
      this.aircraftList = this.aircraftListService.getAircraftDetail(this.aircraft_ev_id).valueChanges();

      this.aircraftList.subscribe(data => {
        console.log(data);
      });
  }

}
