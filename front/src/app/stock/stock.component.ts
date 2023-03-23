import { Component, OnDestroy } from '@angular/core';
import { ArticleService } from '../services/article.service';
import {
  faRotateRight,
  faPlus,
  faTrashAlt,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { Article } from '../interfaces/article';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnDestroy {
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashAlt = faTrashAlt;
  faSpinner = faSpinner;
  selectedArticles = new Set<Article>();

  isRemoving = false;
  errorMsg = '';
  constructor(protected readonly articleService: ArticleService) {
    console.log('articleService: ' + articleService);
  }

  ngOnDestroy(): void {
    console.log('onDestroy');
  }

  remove() {
    console.log('remove');
    const ids = [...this.selectedArticles].map((a) => a.id);
    of(undefined)
      .pipe(
        tap(() => {
          this.errorMsg = '';
          this.isRemoving = true;
        }),
        switchMap(() => {
          return this.articleService.remove(ids);
        }),
        tap(() => {
          this.selectedArticles.clear();
          this.errorMsg = '';
        }),
        finalize(() => {
          this.isRemoving = false;
        }),
        catchError((err) => {
          console.log('err: ', err);
          this.errorMsg = err.message;
          return of(undefined);
        })
      )
      .subscribe();
  }

  select(a: Article) {
    if (this.selectedArticles.has(a)) {
      this.selectedArticles.delete(a);
      return;
    }
    this.selectedArticles.add(a);
  }
}
