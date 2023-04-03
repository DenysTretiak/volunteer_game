import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public requests = [
    {
      name: '10 ОГШБ, напрямок Харківський',
      items: '3 Дрони',
      time: '15 днів'
    },
    {
      name: '128 ОГШБ, Запорізький напрямок',
      items: '5 Тепловізорів',
      time: '10 днів'
    },
    {
      name: '59 ОМБ, Бахмутський напрямок',
      items: '1 Дрон, 2 тепловізори',
      time: '15 днів'
    },
    {
      name: '72 ОМБ, Донецький напрямок',
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
  public carState: any = [
    {
      url: './assets/car.png',
      drons: 0,
      thermalImagers: 0,
      top: '315px',
      left: '315px',
      id: 'car1',
      type: 'car',
    },
    {
      url: './assets/car.png',
      drons: 0,
      thermalImagers: 0,
      top: '408px',
      left: '520px',
      type: 'car',
      id: 'car2'
    },
//    {
//      drons: 0,
//      thermalImagers: 0,
//      id: 'ownCar1'
//    },
//    {
//      drons: 0,
//      thermalImagers: 0,
//      id: 'ownCar2'
//    }
  ]
//  public carState: any = new BehaviorSubject({
//    car1: {
//      drons: 0,
//      thermalImagers: 0,
//      top: '315px',
//      left: '315px',
//    },
//    car2: {
//      drons: 0,
//      thermalImagers: 0,
//      top: '408px',
//      left: '520px',
//    },
//    ownCar1: {
//      drons: 0,
//      thermalImagers: 0
//    },
//    ownCar2: {
//      drons: 0,
//      thermalImagers: 0
//    }
//  })

  cityCenters = [
    {
      id: 'kv',
      name: 'Київ',
      top: '275px',
      left: '790px',
      time: '2 дні'
    },
    {
      id: 'vn',
      name: 'Вінниця',
      top: '275px',
      left: '640px',
      time: '1 день'
    }
  ]
  // public cityCenters = {
  //   kyiv: {
  //     top: '275px',
  //     left: '790px'
  //   },
  //   vinnytsia: {
  //     top: '455px',
  //     left: '640px'
  //   }
  // };

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
    this.carState = this.carState.map((car: any) => {
      if (car.id === id) {
        car.drons = items.drons;
        car.thermalImagers = items.thermalImagers;
        return car;
//        return {
//          ...car,
//          drons: items.frons,
//          thermalImagers: items.thermalImagers
//        }
      }
    })
//    const carState = this.carState.value;
//    carState[id] = items;
//    this.carState.next(carState);
  }
}
