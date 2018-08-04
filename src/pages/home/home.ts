import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { AircraftListPage } from '../aircraft-list/aircraft-list';
import { EventListPage } from '../event-list/event-list';
import { MapPage } from '../map/map';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tab1 = MapPage;
  tab2 = AircraftListPage;
  tab3 = EventListPage;

  constructor(private navCtrl: NavController, public toastCtrl: ToastController) {
  }

  switchTabs() {
    this.navCtrl.parent.select(2);
  }
}
