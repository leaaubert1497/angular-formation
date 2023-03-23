import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles$ = new BehaviorSubject<Article[]>([
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
  ]);

  constructor() {
    setTimeout(() => {
      this.articles$.value.push({
        id: 'a3',
        name: 'marteau',
        price: 10.0,
        qty: 100,
      });
      this.articles$.next(this.articles$.value);
    }, 2000);
  }
}
