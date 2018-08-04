import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Aircraft } from '../model/aircraft/aircraft.model';

@Injectable()
export class AircraftListService {

    next;

    constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
        this.afAuth.auth.signInAnonymously();
        
    }

    getAircraftList(itemsPerPage) {
        let db = this.afs.collection<Aircraft>('aircraft', ref => ref.orderBy('regis_no').startAfter('N').limit(itemsPerPage));
        // db.ref.get().then(documentSnapshots => {
        //     this.next = documentSnapshots.docs[documentSnapshots.docs.length-1];
        // });  

        return db;
        /*
            let db = this.afs.collection<Aircraft>('aircraft', ref => ref.orderBy('ev_id').startAfter(lastVisible).limit(itemsPerPage));
            db.ref.get().then(documentSnapshots => {
            const lastVisible = documentSnapshots.docs[documentSnapshots.size - 1];  
            if (!lastVisible) {
                return;
            }
        });
        */
    }

    getNextAircraftList(itemPointer, itemsPerPage) {
        if (this.next) {
            let db = this.afs.collection<Aircraft>('aircraft', ref => ref.orderBy('regis_no').startAfter(0).limit(itemsPerPage));
            db.ref.get().then(documentSnapshots => {
                this.next = documentSnapshots.docs[itemPointer-1];
            });  
    
            return db;
        }
        else {
            return null;
        }
    }

    getAircraftDetail(ev_id) {
        return this.afs.collection<Aircraft>('aircraft', ref =>  ref.where('ev_id', '==', ev_id));
    }
}