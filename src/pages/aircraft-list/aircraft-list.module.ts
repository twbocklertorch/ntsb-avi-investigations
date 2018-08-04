import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AircraftListPage } from './aircraft-list';

@NgModule({
  declarations: [
    AircraftListPage,
  ],
  imports: [
    IonicPageModule.forChild(AircraftListPage),
  ],
})
export class AircraftListPageModule {}
