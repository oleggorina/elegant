import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appProductPrice]',
  standalone: true
})
export class ProductPriceDirective {
  @Input() price: number = 0;
  @Input() discount: number = 0;
  constructor() { }

  calculateNewPrice(): number {
    const discountAmount = (this.price * this.discount) / 100;
    const newPrice = this.price - discountAmount;
    return newPrice;
  }

}
