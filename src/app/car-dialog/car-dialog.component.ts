import { ApplicationRef, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
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
  constructor(
    private storeService: StoreService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private changeDetectorRef: ChangeDetectorRef,
    private applicationRef: ApplicationRef
  ) {
  }

  ngOnInit() {
    this.storeService.dronsCount.subscribe(dronsCount => this.baseDronCount = dronsCount);
    this.storeService.thermalImagerCount.subscribe(thermalImagersCount => this.baseThermalImagersCount = thermalImagersCount);
//    this.storeService.carState.subscribe((carState: any) => {
//      this.carDrons = carState[this.data.id].drons;
//      this.carThermalImagers = carState[this.data.id].thermalImagers;
//    })
    this.carDrons = this.storeService.carState.find((car: any) => car.id === this.data.id)?.drons;
    this.carThermalImagers = this.storeService.carState.find((car: any) => car.id === this.data.id)?.thermalImagers;
    this.destinations = this.storeService.cityCenters;
  }

  openLoadCard() {
    this.isLoadCardOpen = true;
  }

  openSendItems() {
    this.isSendItemsOpen = true;
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

  }
}
