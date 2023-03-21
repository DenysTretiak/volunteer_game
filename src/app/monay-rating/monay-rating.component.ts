import {Component, OnInit} from '@angular/core';
import {StoreService} from "../store.service";
import {DAY_TIME_VALUE} from "../constants";

@Component({
  selector: 'app-monay-rating',
  templateUrl: './monay-rating.component.html',
  styleUrls: ['./monay-rating.component.css']
})
export class MonayRatingComponent implements OnInit {
  money: any;
  rating: any
  constructor(private storeService: StoreService) {

  }

  ngOnInit() {
    this.storeService.money.subscribe(money => this.money = money);
    this.storeService.rating.subscribe(rating => this.rating = rating);
    setInterval(() => {
      this.storeService.rating.next(this.rating + 24);
      this.storeService.money.next(Math.round(this.money + this.rating * 0.1));

    }, DAY_TIME_VALUE)
  }
}
