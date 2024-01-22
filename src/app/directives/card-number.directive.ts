import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCardNumber]',
  standalone: true
})
export class CardNumberDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    let inputValue = inputElement.value.replace(/\D/g, '');
    inputValue = inputValue.slice(0, 16);
    inputValue = inputValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    inputElement.value = inputValue;
  }

}
