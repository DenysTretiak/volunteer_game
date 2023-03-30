import { Component } from '@angular/core';

@Component({
  selector: 'app-donates-dialog',
  templateUrl: './donates-dialog.component.html',
  styleUrls: ['./donates-dialog.component.css']
})
export class DonatesDialogComponent {
  funds = [
    {
      title: 'Повернись живим',
      img: './assets/savelife.png',
      link: 'https://savelife.in.ua/donate/'
    },
    {
      title: 'Благодійний фонд Сергія Притули',
      img: './assets/fund_pritula.png',
      link: 'https://prytulafoundation.org/donation'
    },
    {
      title: 'Kolo - благодійний фонд',
      img: './assets/kolo.png',
      link: 'https://koloua.com/donate'
    }
  ]
}
