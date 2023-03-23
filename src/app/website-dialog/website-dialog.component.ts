import { Component } from '@angular/core';
import {StoreService} from "../store.service";
import {DAY_TIME_VALUE} from "../constants";

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
      img: './assets/dron_autel.png',
      name: 'Autel EVO II Pro ',
      price: '20000',
      time: 4,
      type: 'dron'
    },
    {
      img: './assets/dron_autel_with_thermal_imager.png',
      name: 'Autel EVO II Dual',
      price: '30000',
      time: 2,
      type: 'dron'
    },
    {
      img: './assets/dron_dji.png',
      name: 'DJI Mavic 2 Zoom',
      price: '10000',
      time: 5,
      type: 'dron'
    }
  ];

  thermalImagers = [
    {
      img: './assets/imager_helion.png',
      name: 'Helion 2',
      price: '25000',
      time: 4,
      type: 'thermalImager'
    },
    {
      img: './assets/imager_finder.png',
      name: 'FINDER FL25R',
      price: '35000',
      time: 3,
      type: 'thermalImager'
    },
    {
      img: './assets/imager_guide.png',
      name: 'Guide TrackIR 35',
      price: '10000',
      time: 5,
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
      type: item.type,
      time: item.time
    })
  }

  submitOrder() {
    let orderSum = 0;
    let itemsCount = 0
    const finishedOrders: any[] = [];

    this.cartItems.forEach(item => {
      orderSum += item.finalSum

      finishedOrders.push({
        type: item.type,
        count: item.count,
        time: item.time
      })
    })

      const moneyAmount = this.storeService.money.value;

      if(moneyAmount < orderSum) {
        alert(`У вас недостатньо грошей для цього замовлення, у вас всього: ${moneyAmount}, а потрібно: ${orderSum}`);
        return;
      }

      this.cartItems = [];
      this.storeService.decreaseMoneySum(orderSum);

      finishedOrders.forEach(finishedOrder => this.finishItemsOrder(finishedOrder.type, finishedOrder.count, finishedOrder.time))
  }

  finishItemsOrder(type: string, count: number, time: number) {
    setTimeout(() => {
      let finishedOrderText;
      if(type === 'dron') {
        this.storeService.increaseDrons(count);
        finishedOrderText = `Було доставлено ${count} дронів`;
      } else {
        this.storeService.increaseThermalImagers(count);
        finishedOrderText = `Було доставлено ${count} тепловізорів`;
      }

      this.storeService.addFinishedOrder(finishedOrderText);
      this.storeService.increaseFinishedOrdersCount();
    }, time * DAY_TIME_VALUE);
  }

  getAllItemsFinalSum() {
    let finalSum = 0;

    this.cartItems.forEach((cartItem) => {
      finalSum += cartItem.finalSum;
    })

    return finalSum;
  }
}
