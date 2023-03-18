import { Component } from '@angular/core';
import {StoreService} from "../store.service";

@Component({
  selector: 'app-website-dialog',
  templateUrl: './website-dialog.component.html',
  styleUrls: ['./website-dialog.component.css']
})
export class WebsiteDialogComponent {
    dronItemCount: any = {
      dronItemCount0: 1,
      dronItemCount1: 1,
      dronItemCount2: 1,
    }

  thermalImagerCount: any = {
    thermalImagerCount0: 1,
    thermalImagerCount1: 1,
    thermalImagerCount2: 1,
  }

  dronItems = [
    {
      img: './assets/drone-1.jpg',
      name: 'Дрон 1',
      price: '20000',
      time: '4 дні',
      type: 'dron'
    },
    {
      img: './assets/drone-2.jpg',
      name: 'Дрон 2',
      price: '30000',
      time: '2 дні',
      type: 'dron'
    },
    {
      img: './assets/drone-3.jpg',
      name: 'Дрон 3',
      price: '10000',
      time: '5 днів',
      type: 'dron'
    }
  ];

  thermalImagers = [
    {
      img: './assets/thermalImager-1.jpg',
      name: 'Тепловізор 1',
      price: '25000',
      time: '4 дні',
      type: 'thermalImager'
    },
    {
      img: './assets/thermalImager-2.jpg',
      name: 'Тепловізор 2',
      price: '35000',
      time: '3 дні',
      type: 'thermalImager'
    },
    {
      img: './assets/thermalImager-3.jpg',
      name: 'Тепловізор 3',
      price: '10000',
      time: '5 днів',
      type: 'thermalImager'
    }
  ]

  cartItems: any[] = [];

  constructor(private storeService: StoreService) {
  }

  addItemToCart(item: any, count: number) {
    this.cartItems.push({
      name: item.name,
      count,
      price: item.price,
      finalSum: item.price * count,
      type: item.type
    })
  }

  submitOrder() {
      let orderSum = 0;
      let dronsCount = 0;
      let thermalImagersCount = 0

      this.cartItems.forEach(item => {
        orderSum += item.finalSum

        if (item.type === 'dron') {
          dronsCount += item.count
        } else {
          thermalImagersCount += item.count;
        }
      })

      const moneyAmount = this.storeService.money.value;

      if(moneyAmount < orderSum) {
        alert(`У вас недостатньо грошей для цього замовлення, у вас всього: ${moneyAmount}, а потрібно: ${orderSum}`);
        return;
      }

      this.cartItems = [];
      this.storeService.decreaseMoneySum(orderSum);

      console.log(orderSum);
      console.log(dronsCount, 'dronsCount');
      console.log(thermalImagersCount, 'thermalImagersCount');

      setTimeout(() => {
        this.storeService.increaseThermalImagers(thermalImagersCount);
        this.storeService.increaseDrons(dronsCount);
        let finishedOrderText;
        if (thermalImagersCount > 0 && dronsCount > 0) {
          finishedOrderText = `Було доставлено ${dronsCount} дронів і ${thermalImagersCount} тепловізорів`;
        } else if(thermalImagersCount > 0 && dronsCount === 0) {
          finishedOrderText = `Було доставлено ${thermalImagersCount} тепловізорів`;
        } else if(dronsCount > 0 && thermalImagersCount === 0) {
          finishedOrderText = `Було доставлено ${dronsCount} дронів`;
        }

        this.storeService.addFinishedOrder(finishedOrderText);
        this.storeService.increaseFinishedOrdersCount();
      }, 1000);
  }
}
