import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Event } from '../../model/event/event.model';
import { EventListService } from '../../services/event-list.service';

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  eventList: Observable<Event[]>;
  event_ev_id: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private eventListService: EventListService) {
      //this.event = new Event();

      this.event_ev_id = this.navParams.get('event_ev_id');
      this.eventList = this.eventListService.getEventDetail(this.event_ev_id).valueChanges();

      this.eventList.subscribe(data => {
        console.log(data);
      });
  }

  ionViewDidLoad() {
  }

}
