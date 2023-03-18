import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {StoreService} from "../store.service";

@Component({
  selector: 'app-temporary-base',
  templateUrl: './temporary-base.component.html',
  styleUrls: ['./temporary-base.component.css']
})
export class TemporaryBaseComponent {
  finishedOrders: any[] = [];
    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      public storeService: StoreService
    ) {
      this.finishedOrders = this.storeService.finishedOrders;
    }
}
