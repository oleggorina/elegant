import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ProductCartInterface, ProductInterface } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: ProductCartInterface[] = [];
  private cartItemsSubject = new BehaviorSubject<ProductCartInterface[]>([]);
  private subtotalSubject = new BehaviorSubject<number>(0);
  private totalSubject = new BehaviorSubject<number>(0);
  private selectedDeliveryOptionSubject = new BehaviorSubject<string>('free');
  cartItems$ = this.cartItemsSubject.asObservable();
  subtotal$ = this.subtotalSubject.asObservable();
  total$ = this.subtotalSubject.asObservable();
  selectedDeliveryOption$ = this.selectedDeliveryOptionSubject.asObservable();

  constructor() {
    const storedCartItems = localStorage.getItem('cart');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
      this.cartItemsSubject.next(this.cartItems);
      this.updateSubtotal();
    }
   }

   addToCart(product: ProductCartInterface): void {
    const existingItem = this.cartItems.find(item =>item.id === product.id && item.color === product.color);
    if (existingItem) {
      console.log('Product already exists in the cart');
    } else {
      this.cartItems.push(product);
    }
    this.updateCartItems();
    this.updateSubtotal();
   }

   removeFromCart(productId: string, color: string): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId && item.color !== color);
    this.updateCartItems();
    this.updateSubtotal();
   }

   getCartItemsLength(): Observable<number> {
    return this.cartItems$.pipe(
      map(items => items.length)
    )
   }

   getCartItems(): ProductCartInterface[] {
    return this.cartItems;
   }

   getPriceWithDiscount(product: ProductCartInterface): number {
    if (product.discount > 0) {
      const discountAmount = (product.price * product.discount) / 100;
      return product.price - discountAmount;
    } else {
      return product.price
    }
  }

  getTotalSubtotalPrice(): number {
    let totalSubtotalPrice = 0;
    this.cartItems.forEach(item => {
      totalSubtotalPrice += this.getSubtotalPrice(item);
    });
    return totalSubtotalPrice;
  }

  getSubtotalPrice(product: ProductCartInterface): number {
    const newPrice = this.getPriceWithDiscount(product);
    return newPrice * product.count;
  }

   getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
   }

   updateCartItemCount(productId: string, count: number): void {
    const existingItem = this.cartItems.find(item => item.id === productId);
    if (existingItem) {
      existingItem.count = count;
      this.updateCartItems();
      this.updateSubtotal();
    }
   }

   updateSelectedDeliveryOption(option: string): void {
    this.selectedDeliveryOptionSubject.next(option);
   }

   updateTotal(total: number): void {
    this.totalSubject.next(total);
   }

   private updateSubtotal(): void {
    this.subtotalSubject.next(this.getTotalSubtotalPrice());
   }

   private updateCartItems(): void {
    this.cartItemsSubject.next(this.cartItems);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
   }
}
