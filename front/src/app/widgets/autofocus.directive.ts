import { Directive, ElementRef, OnInit } from '@angular/core';
import { throwError } from 'rxjs';

@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective implements OnInit {
  constructor(private readonly elt: ElementRef<HTMLInputElement>) {
    console.log('appAutofocus');
  }
  ngOnInit(): void {
    this.elt.nativeElement.select();
  }
}
