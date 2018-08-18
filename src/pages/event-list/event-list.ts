import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { EventListService } from '../../services/event-list.service';
import { Event } from '../../model/event/event.model';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {

  eventList = [];

  // https://blog.ionicframework.com/building-ionic-apps-with-firestore/

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private eventListService: EventListService,
    private storage: Storage, 
    private toastCtrl: ToastController) {
   }

   ionViewDidLoad() {
    this.loadEventData();
  }

  loadEventData() {
    // Get cached events or get from Firestore if no cache exists
    this.storage.get('events').then((events) => {
      if (events) {
        this.eventList = events;
      }
      else {
        this.eventListService.getEventList().valueChanges().subscribe(events => {
          this.eventList = events;
          this.storage.set('events', events);
        });
      }
    });

    this.presentToast('Data has been loaded');
  }

  presentToast(messageTxt) {
    let toast = this.toastCtrl.create({
      message: messageTxt,
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
