import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {WebsiteDialogComponent} from "../website-dialog/website-dialog.component";
import {RequestsDialogComponent} from "../requests-dialog/requests-dialog.component";
import {StoreService} from "../store.service";
import {TemporaryBaseComponent} from "../temporary-base/temporary-base.component";
import {DAY_TIME_VALUE} from "../constants";
import {CarDialogComponent} from "../car-dialog/car-dialog.component";
import {DonatesDialogComponent} from "../donates-dialog/donates-dialog.component";

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.css']
})
export class MapContainerComponent implements OnInit {
    iconsArray: any[] = [];
    items = [
//      {
//        url: './assets/car.png',
//        top: '315px',
//        left: '315px',
//        type: 'car',
//        id: 'car1'
//      },
//      {
//        url: './assets/car.png',
//        top: '408px',
//        left: '520px',
//        type: 'car',
//        id: 'car2'
//      },
//      {
//        url: './assets/own_car.png',
//        top: '360px',
//        left: '760px',
//        type: 'car',
//        id:'ownCar1'
//      },
//      {
//        url: './assets/own_car.png',
//        top: '310px',
//        left: '620px',
//        type: 'car',
//        id: 'ownCar2'
//      },
      {
        url: './assets/central_base.png',
        top: '400px',
        left: '635px'
      },
      {
        url: './assets/temporary_base.png',
        top: '400px',
        left: '235px',
        type: 'temporary_base'
      },
      {
        url: './assets/red_request_icon.png',
        top: '590px',
        left: '1370px'
      },
      {
        url: './assets/blue_request_icon.png',
        top: '490px',
        left: '1340px'
      },
      {
        url: './assets/blue_request_icon.png',
        top: '315px',
        left: '1310px'
      },
      {
        url: './assets/blue_request_icon.png',
        top: '675px',
        left: '1190px'
      }
    ]
    imageUrl = "url('./assets/ua-04.png')";
    currentDay: number = 1;

    constructor(public dialog: MatDialog, private storeService: StoreService) {

    }

    ngOnInit() {
      setInterval(() => {
        this.currentDay += 1;
      }, DAY_TIME_VALUE);

      this.iconsArray = [...this.items, ...this.storeService.carState]
    }

  websiteClicked() {
      this.dialog.open(WebsiteDialogComponent, {
        position: {
          top: '200px',
          left: '400px'
        },
        panelClass: 'position',
        width: '1000px',
      });
  }

  donatesClicked() {
      this.dialog.open(DonatesDialogComponent, {
        position: {
          top: '200px',
          left: '400px'
        },
        panelClass: 'position',
        width: '1000px',
      })
  }

  requestsClicked() {
    this.dialog.open(RequestsDialogComponent, {
      position: {
        top: '200px',
        left: '200px'
      },
      panelClass: 'position',
      width: '1000px',
      data: {
        requests: this.getRequests()
      }
    });
  }

  onMapIconClicked(type: any, id: any) {
      if(type === 'temporary_base') {
          this.onTemporaryBaseClick();
      } else if (type === 'car') {
        this.onCarClick(id);
      }
  }

  onCarClick(id: string) {
    this.dialog.open(CarDialogComponent, {
      position: {
        top: '200px',
        left: '400px'
      },
      panelClass: 'position',
      width: '500px',
      data: {
        id
      }
    });
  }

  onTemporaryBaseClick() {
      this.dialog.open(TemporaryBaseComponent, {
        position: {
          top: '200px',
          left: '400px'
        },
        panelClass: 'position',
        width: '300px',
        data: {
          dronsCount: this.storeService.dronsCount.value,
          thermalImagers: this.storeService.thermalImagerCount.value
        }
      });
  }


  getRequests() {
      return this.storeService.requests;
  }

  getRequestsNumber() {
      return this.storeService.requests.length;
  }
}
