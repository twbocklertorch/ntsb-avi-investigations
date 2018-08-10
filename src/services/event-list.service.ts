import { Injectable } from '@angular/core';
import { Event } from '../model/event/event.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class EventListService {

    private itemsCollection: AngularFirestoreCollection<Event>;

    constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
        this.afAuth.auth.signInAnonymously();
        
    }

    getEventList() {
        return this.itemsCollection = this.afs.collection<Event>('events', ref => ref
            .orderBy('ev_id','desc')
            .limit(10000));

        //return this.itemsCollection = this.afs.collection<Event>('events', ref => ref.where('ev_date', '<', '8/5/2018'));
        //return this.itemsCollection = this.afs.collection<Event>('events', ref => ref.where('ev_id', '==', '20001211X11043'));
        //return this.afs.collection<Event>('events', ref => ref.where('ev_id', '==', '20001204X00000')); 
    }

    getEventDetail(ev_id) {
        return this.afs.collection<Event>('events', ref =>  ref.where('ev_id', '==', ev_id));
    }
}