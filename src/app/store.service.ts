import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public requests = [
    {
      name: 'Військова частина 1',
      items: '3 Дрони',
      time: '15 днів'
    },
    {
      name: 'Військова частина 2',
      items: '5 Тепловізорів',
      time: '10 днів'
    },
    {
      name: 'Військова частина 3',
      items: '1 Дрон, 2 тепловізори',
      time: '15 днів'
    },
    {
      name: 'Військова частина 4',
      items: '1 Дрони',
      time: '5 днів'
    },
  ]

  public money: BehaviorSubject<any> = new BehaviorSubject<any>(187000);
  public rating: BehaviorSubject<any> = new BehaviorSubject<any>(53000);
  public dronsCount: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  public thermalImagerCount: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  public finishedOrders: any[] = [];
  public finishedOrdersCount: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  public carState: any = new BehaviorSubject({
    car1: {
      drons: 0,
      thermalImagers: 0
    },
    car2: {
      drons: 0,
      thermalImagers: 0
    },
    ownCar1: {
      drons: 0,
      thermalImagers: 0
    },
    ownCar2: {
      drons: 0,
      thermalImagers: 0
    }
  })

  decreaseMoneySum(amount: number) {
    this.money.next(
      this.money.value - amount
    )
  }

  increaseDrons(count: number) {
    this.dronsCount.next(
      this.dronsCount.value + count
    )
  }

  increaseThermalImagers(count: number) {
    this.thermalImagerCount.next(
      this.thermalImagerCount.value + count
    )
  }

  increaseFinishedOrdersCount() {
    this.finishedOrdersCount.next(
      this.finishedOrdersCount.value + 1
    )
  }

  resetItemsCount() {
    this.dronsCount.next(0);
    this.thermalImagerCount.next(0);
  }

  addFinishedOrder(order: any) {
    this.finishedOrders.push(order)
  }

  changeCarState(id: string, items: any) {
    const carState = this.carState.value;
    carState[id] = items;
    this.carState.next(carState);
  }
}
