import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {WebsiteDialogComponent} from "../website-dialog/website-dialog.component";
import {RequestsDialogComponent} from "../requests-dialog/requests-dialog.component";
import {StoreService} from "../store.service";
import {TemporaryBaseComponent} from "../temporary-base/temporary-base.component";
import {DAY_TIME_VALUE} from "../constants";
import {CarDialogComponent} from "../car-dialog/car-dialog.component";
import {DonatesDialogComponent} from "../donates-dialog/donates-dialog.component";
import {SocialsDialogComponent} from "../socials-dialog/socials-dialog.component";
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.css']
})
export class MapContainerComponent implements OnInit {
    iconsArray: any[] = [];
    items = [
      {
        url: './assets/central_base.png',
        top: '400px',
        left: '635px',
        type: 'central_base'
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

    constructor(public dialog: MatDialog, public storeService: StoreService) {}

    ngOnInit() {
      setInterval(() => {
        this.currentDay += 1;
      }, DAY_TIME_VALUE);

      this.storeService.carState.subscribe(carState => {
        this.iconsArray = [...this.items, ...carState]
      })
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
        requests: this.getRequests(),
        finishedRequests: this.getFinishedRequests()
      }
    });
  }

  onMapIconClicked(type: any, id: any) {
      if (type === 'temporary_base' || type === 'central_base') {
          this.onTemporaryBaseClick(type);
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
    }).afterClosed().subscribe(res => {
      if(res?.isFinalDestination) {
        this.dialog.open(SuccessDialogComponent, {
          position: {
            top: '200px',
            left: '400px'
          },
          panelClass: 'position',
          width: '750px'
        })

        this.storeService.addNewCar();
        this.storeService.addFinishedRequest();
        this.storeService.increaseRating(3000);
      }
    });
  }

  onTemporaryBaseClick(type: string) {
      let data;
      if (type === 'central_base') {
        data = {
          dronsCount: this.storeService.dronsCountCentralStorage.value,
          thermalImagers: this.storeService.thermalImagerCountCentralStorage.value,
          isCentralBase: true
        }
      } else {
        data = {
          dronsCount: this.storeService.dronsCount.value,
          thermalImagers: this.storeService.thermalImagerCount.value
        }
      }
      this.dialog.open(TemporaryBaseComponent, {
        position: {
          top: '200px',
          left: '400px'
        },
        panelClass: 'position',
        width: '300px',
        data
      });
  }

  socialsClicked() {
    this.dialog.open(SocialsDialogComponent, {
      position: {
        top: '150px',
        left: '400px'
      },
      panelClass: 'position',
      width: '400px'
    });
  }


  getRequests() {
      return this.storeService.requests;
  }

  getFinishedRequests() {
      return this.storeService.finishedRequests;
  }

  getRequestsNumber() {
      return this.storeService.requests.length;
  }
}
