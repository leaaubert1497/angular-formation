import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private articles$ = new BehaviorSubject<Article[]>([
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

  getArticles(): Observable<Article[]> {
    return this.articles$.pipe(distinctUntilChanged());
  }
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
