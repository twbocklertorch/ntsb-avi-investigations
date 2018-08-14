import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { FIREBASE_CONFIG } from '../environments/firebase.credentials';
import { NoteListService } from '../services/note-list.service';
import { AircraftListService } from '../services/aircraft-list.service';
import { EventListService } from '../services/event-list.service';
import { AircraftListPage } from '../pages/aircraft-list/aircraft-list';
import { EventListPage } from '../pages/event-list/event-list';
import { MapPage } from '../pages/map/map';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    AircraftListPage,
    EventListPage,
    MapPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    IonicStorageModule.forRoot({
      name: 'ntsb-cache',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AircraftListPage,
    EventListPage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    NoteListService,
    AircraftListService,
    EventListService,
    AngularFireAuth
  ]
})
export class AppModule { }
