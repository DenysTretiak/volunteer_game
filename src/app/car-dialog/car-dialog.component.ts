import {Component, Inject, OnInit} from '@angular/core';
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
  baseDronCount = 0;
  baseThermalImagersCount = 0;
  constructor(
    private storeService: StoreService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit() {
    this.storeService.dronsCount.subscribe(dronsCount => this.baseDronCount = dronsCount);
    this.storeService.thermalImagerCount.subscribe(thermalImagersCount => this.baseThermalImagersCount = thermalImagersCount);
    this.storeService.carState.subscribe((carState: any) => {
      this.carDrons = carState[this.data.id].drons;
      this.carThermalImagers = carState[this.data.id].thermalImagers;
    })

  }

  openLoadCard() {
    this.isLoadCardOpen = true;
  }

  onLoadButtonClick() {
    this.isLoadCardOpen = false;
    // this.carDrons = this.baseDronCount;
    // this.carThermalImagers = this.baseThermalImagersCount;
    this.storeService.changeCarState(this.data.id, {
      drons: this.baseDronCount,
      thermalImagers: this.baseThermalImagersCount
    })
    this.storeService.resetItemsCount();
  }
}
