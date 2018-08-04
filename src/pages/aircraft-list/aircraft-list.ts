import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Observable } from 'rxjs/Observable';
import { AircraftListService } from '../../services/aircraft-list.service';
import { Aircraft } from '../../model/aircraft/aircraft.model';

@IonicPage()
@Component({
  selector: 'page-aircraft-list',
  templateUrl: 'aircraft-list.html',
})
export class AircraftListPage {

  aircraftList: Observable<Aircraft[]>;
  aircraftArr = [];
  allAircrafts = [];
  page = 1;
  itemsPerPage = 30;
  itemPointer = 0;
  lastKey;

  // http://javasampleapproach.com/firebase/ionic-3-firebase-example-crud-operations-with-firebase-realtime-database

  constructor(public navCtrl: NavController, private aircraftListService: AircraftListService) {
    // Build 1st array of records
    this.getAircraftList(this.itemPointer);
   }

   getAircraftList(itemPointer) {
    //this.aircraftList = this.aircraftListService.getAircraftList(this.itemsPerPage).valueChanges();

    this.aircraftListService.getAircraftList(this.itemsPerPage).valueChanges().subscribe(data => {
      
      for (let i = 0; i < data.length; i++) {
        this.aircraftArr.push(data[i]);
      }
      //console.log(this.aircraftArr);
      this.allAircrafts = this.aircraftArr;
    });
	
   }

   getSearchItems(searchbar) {
		// set q to the value of the searchbar
		var q = searchbar.srcElement.value;

		// if the value is an empty string don't filter the items
		if (!q) {
			this.aircraftArr = this.allAircrafts;
			return;
		}
		
		this.aircraftArr = this.allAircrafts.filter((v) => {
			if(v.regis_no && q) {
			  if ((v.regis_no.toLowerCase().indexOf(q.toLowerCase()) > -1)) {
					return true;
			  }
			  this.aircraftArr = this.allAircrafts;
			  return false;
			}
    });
  }
    
   doInfinite(infiniteScroll) {
    //console.log('Begin async operation');

    setTimeout(() => {
      this.itemPointer = this.page * this.itemsPerPage;

      try {
        // Push/Append next set of records into array
        this.aircraftListService.getNextAircraftList(this.itemPointer, this.itemsPerPage).valueChanges().subscribe(data => {
          if (data) {
            for (let i = 0; i < data.length; i++) {
              this.aircraftArr.push(data[i]);
            }
            //console.log(this.aircraftArr);
          }
          else {
            //console.log('no data');
          }
        });  

        //console.log('Async operation has ended');
        this.page++;
        infiniteScroll.complete();
        }
      catch (e) {
        // if end of records, disable the infinite scroll
        infiniteScroll.enabled = false;
      }
    }, 500);
  }
}
