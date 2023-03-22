import { Component } from '@angular/core';
import { Article } from '../interfaces/article';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent {
  articles: Article[] = [
    {
      id: 'a1',
      name: 'pelle',
      price: 3.99,
      qty: 123,
    },
    {
      id: 'a2',
      name: 'rateau',
      price: 8.99,
      qty: 200,
    },
    {
      id: 'a3',
      name: 'marteau',
      price: 10.0,
      qty: 100,
    },
  ];
}
