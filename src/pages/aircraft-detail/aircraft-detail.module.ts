import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AircraftDetailPage } from './aircraft-detail';

@NgModule({
  declarations: [
    AircraftDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AircraftDetailPage),
  ],
})
export class AircraftDetailPageModule {}
