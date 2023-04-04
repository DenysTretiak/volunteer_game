import { ApplicationRef, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StoreService} from "../store.service";

@Component({
  selector: 'app-car-dialog',
  templateUrl: './car-dialog.component.html',
  styleUrls: ['./car-dialog.component.css']
})
export class CarDialogComponent implements OnInit {
  carDrons: number = 0;
  carThermalImagers: number = 0;
  isLoadCardOpen = false;
  isSendItemsOpen = false;
  baseDronCount = 0;
  baseThermalImagersCount = 0;
  destinations: any;
  isLoadToStorageOpen: boolean = false;
  centralBaseDronCount = 0;
  centralBaseThermalImagersCount = 0;
  place: string = '';

  constructor(
    private storeService: StoreService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private changeDetectorRef: ChangeDetectorRef,
    private applicationRef: ApplicationRef,
    private dialogRef: MatDialogRef<any>
  ) {
  }

  ngOnInit() {
    this.storeService.dronsCount.subscribe(dronsCount => this.baseDronCount = dronsCount);
    this.storeService.thermalImagerCount.subscribe(thermalImagersCount => this.baseThermalImagersCount = thermalImagersCount);
    this.storeService.carState.subscribe((carState: any) => {
      const car = carState.find((car: any) => car.id === this.data.id);
      if (car) {
        this.carDrons = car.drons;
        this.carThermalImagers = car.thermalImagers;
        this.place = car.place;
      }
    })
    this.storeService.dronsCountCentralStorage.subscribe(dronsCount => this.centralBaseDronCount = dronsCount);
    this.storeService.thermalImagerCountCentralStorage.subscribe(thermalImagersCount => this.centralBaseThermalImagersCount = thermalImagersCount);

    this.destinations = this.storeService.cityCenters;
  }

  openLoadCard() {
    this.isLoadCardOpen = true;
    if(this.place === 'vn') {
      this.baseDronCount = this.centralBaseDronCount;
      this.baseThermalImagersCount = this.centralBaseThermalImagersCount;
    }
  }

  openSendItems() {
    this.isSendItemsOpen = true;
  }

  openLoadToStorage() {
    this.isLoadToStorageOpen = true;
  }

  onLoadButtonClick() {
    this.isLoadCardOpen = false;
    this.storeService.changeCarState(this.data.id, {
      drons: this.baseDronCount,
      thermalImagers: this.baseThermalImagersCount
    })
    this.storeService.resetItemsCount();
  }

  sendCar(destination: any) {
      this.storeService.changeCarState(this.data.id, {
        top: destination.top,
        left: destination.left,
        place: destination.id
      });

      if (destination.id == 'dn') {
        this.dialogRef.close({
          isFinalDestination: true
        });
        return;
      }

      this.dialogRef.close();
  }

  onLoadToStorageButtonClick() {
    this.storeService.increaseDronsCentralStorage(this.carDrons);
    this.storeService.increaseThermalImagersCentralStorage(this.carThermalImagers);
    const top = this.storeService.cityCenters.find(cityCenter => cityCenter.id = 'kv')?.top;
    const left = this.storeService.cityCenters.find(cityCenter => cityCenter.id = 'kv')?.left;
    this.storeService.changeCarState(this.data.id, {
      top,
      left
    });
    this.resetCarItems();
    this.dialogRef.close();
  }

  resetCarItems() {
    this.carDrons = 0;
    this.carThermalImagers = 0;
  }
}
