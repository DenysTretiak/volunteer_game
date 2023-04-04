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
      items: '2 Дрони',
      time: '5 днів'
    },
  ]

  public finishedRequests: any = [];

  public money: BehaviorSubject<any> = new BehaviorSubject<any>(187000);
  public rating: BehaviorSubject<any> = new BehaviorSubject<any>(53000);
  public dronsCount: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  public thermalImagerCount: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  public dronsCountCentralStorage: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  public thermalImagerCountCentralStorage: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  public finishedOrders: any[] = [];
  public finishedOrdersCount: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  public carState: BehaviorSubject<any> = new BehaviorSubject([
    {
      url: './assets/car.png',
      drons: 0,
      thermalImagers: 0,
      top: '315px',
      left: '315px',
      id: 'car1',
      type: 'car',
      place: 'lv'
    },
    {
      url: './assets/car.png',
      drons: 0,
      thermalImagers: 0,
      top: '408px',
      left: '520px',
      type: 'car',
      id: 'car2',
      palace: 'hm'
    },
    {
        url: './assets/own_car.png',
        drons: 0,
        thermalImagers: 0,
        top: '360px',
        left: '760px',
        type: 'car',
        id:'ownCar1',
        palace: null
      }
  ])

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
      top: '475px',
      left: '640px',
      time: '1 день'
    },
    {
      id: 'lv',
      name: 'Львів',
      top: '315px',
      left: '315px',
      time: '1 день'
    },
    {
      id: 'dn',
      name: 'Донецька область',
      top: '550px',
      left: '1330px',
      time: '1 день'
    }
  ]
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

  increaseRating(count: number) {
    this.rating.next(
      this.rating.value + count
    )
  }

  increaseThermalImagers(count: number) {
    this.thermalImagerCount.next(
      this.thermalImagerCount.value + count
    )
  }

  increaseThermalImagersCentralStorage(count: number) {
    this.thermalImagerCountCentralStorage.next(
      this.thermalImagerCountCentralStorage.value + count
    )
  }

  increaseDronsCentralStorage(count: number) {
    this.dronsCountCentralStorage.next(
      this.dronsCountCentralStorage.value + count
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

  resetCentralStorage() {
    this.dronsCountCentralStorage.next(0);
    this.thermalImagerCountCentralStorage.next(0);
  }

  addFinishedOrder(order: any) {
    this.finishedOrders.push(order)
  }

  changeCarState(id: string, items: any) {
    const carState = this.carState.value.map((car: any) => {
        if (car.id === id) {
          car.drons = items.drons || car.drons;
          car.thermalImagers = items.thermalImagers || car.thermalImagers;
          car.top = items.top || car.top;
          car.left = items.left || car.left;
          car.place = items.place || car.place;
        }

        return car;
      });

    this.carState.next(carState);
  }

  addNewCar() {
    const carState = this.carState.value;
    const newCar = {
      url: './assets/own_car.png',
      drons: 0,
      thermalImagers: 0,
      top: '310px',
      left: '620px',
      type: 'car',
      id: 'ownCar2',
    }
    carState.push(newCar);
    this.carState.next(carState);
  }

  addFinishedRequest() {
    const finishedRequest: any = this.requests.pop();
    this.finishedRequests.push(finishedRequest);
  }
}
