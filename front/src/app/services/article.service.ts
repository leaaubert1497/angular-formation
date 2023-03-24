import { Injectable } from '@angular/core';
import { delay, of, tap, throwError, timer } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { generateId } from 'src/misc';
import { Article, NewArticle } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  isLoading = false;
  errorMsg = '';
  protected articles$ = new BehaviorSubject<Article[]>([
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

  add(newArticle: NewArticle): Observable<void> {
    return of(undefined).pipe(
      delay(2000),
      tap(() => {
        if (newArticle.name === 'Trucx') {
          throw new Error('Trucx is not permitted.');
        }
        this.articles$.value.push({
          id: generateId(),
          ...newArticle,
        });
        this.articles$.next(this.articles$.value);
      })
    );
  }

  getArticles(): Observable<Article[]> {
    return this.articles$.pipe(distinctUntilChanged());
  }

  refresh(): Observable<void> {
    return of(undefined).pipe(delay(2000));
  }

  remove(ids: string[]): Observable<void> {
    return of(undefined).pipe(
      delay(2000),
      tap(() => {
        if (ids.length === 2) {
          throw new Error("Interdit d'enlever 2 items à la fois.");
        }
        this.articles$.next(
          this.articles$.value.filter((a) => !ids.includes(a.id))
        );
      })
    );
  }
}
