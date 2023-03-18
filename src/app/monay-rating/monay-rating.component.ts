import {Component, OnInit} from '@angular/core';
import {StoreService} from "../store.service";

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
      this.storeService.money.next(this.money + 100);
      this.storeService.rating.next(this.rating + 150);
    }, 1000)



  }
}
