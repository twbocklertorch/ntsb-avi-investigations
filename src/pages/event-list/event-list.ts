import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Observable } from 'rxjs/Observable';
import { EventListService } from '../../services/event-list.service';
import { Event } from '../../model/event/event.model';

@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {

  eventList: Observable<Event[]>;
  //eventList: AngularFirestoreCollection<Event>;

  // https://blog.ionicframework.com/building-ionic-apps-with-firestore/

  constructor(public navCtrl: NavController, private eventListService: EventListService) {
    this.eventList = this.eventListService.getEventList().valueChanges();

    // this.eventList.subscribe(data => {
    //   console.log(data);
    // });
   }
}
