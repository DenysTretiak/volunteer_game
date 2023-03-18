import {AfterViewChecked, Component, Input} from '@angular/core';
import {StoreService} from "../store.service";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {
    @Input() item: any;
    finishedOrdersCount: any;

    constructor(private storeService: StoreService) {
        this.storeService.finishedOrdersCount.subscribe(items => this.finishedOrdersCount = items);
    }
}
