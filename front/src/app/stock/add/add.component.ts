import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { of, switchMap, tap } from 'rxjs';
import { NewArticle } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  isAdding = false;
  f = new FormGroup({
    name: new FormControl('Truc', [
      Validators.required,
      Validators.minLength(3),
    ]),
    price: new FormControl(0, [Validators.required]),
    qty: new FormControl(0, [Validators.required]),
  });
  faPlus = faPlus; 
  faSpinner = faSpinner

  constructor(
    private readonly articleService: ArticleService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  submit() {
    const newArticle: NewArticle = this.f.value as unknown as NewArticle;
    of(undefined)
    .pipe(
      tap(() => (this.isAdding = true)),
      switchMap(() => {
        return this.articleService.add(newArticle).pipe()
      }),
      switchMap(() => {
        return this.router.navigate(['..'], {relativeTo: this.route});
      }),
      tap(() => (this.isAdding = false))
    )
      .subscribe();
  }
}
