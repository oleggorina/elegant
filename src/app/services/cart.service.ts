import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ProductCartInterface } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: ProductCartInterface[] = [];
  private cartItemsSubject = new BehaviorSubject<ProductCartInterface[]>([]);
  private subtotalSubject = new BehaviorSubject<number>(0);
  private totalSubject = new BehaviorSubject<number>(0);
  private selectedDeliveryOptionSubject = new BehaviorSubject<string>('free');
  private costDeliveryOptionSubject = new BehaviorSubject<number>(0);

  cartItems$ = this.cartItemsSubject.asObservable();
  subtotal$ = this.subtotalSubject.asObservable();
  total$ = this.totalSubject.asObservable();
  selectedDeliveryOption$ = this.selectedDeliveryOptionSubject.asObservable();
  costDeliveryOption$ = this.costDeliveryOptionSubject.asObservable();

  constructor() {
    const storedCartItems = localStorage.getItem('cart');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
      this.cartItemsSubject.next(this.cartItems);
      this.updateSubtotal();
      this.updateTotal();
    }
  }

  addToCart(product: ProductCartInterface): void {
    const existingItem = this.cartItems.find(item => item.id === product.id && item.color === product.color);
    if (existingItem) {
      console.log('Product already exists in the cart');
    } else {
      this.cartItems.push(product);
    }
    this.updateCartItems();
    this.updateSubtotal();
    this.updateTotal();
  }

  removeFromCart(productId: string, color: string): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId || item.color !== color);
    this.updateCartItems();
    this.updateSubtotal();
    this.updateTotal();
  }

  getCartItemsLength(): Observable<number> {
    return this.cartItems$.pipe(
      map(items => items.length)
    );
  }

  getCartItems(): ProductCartInterface[] {
    return this.cartItems;
  }

  getPriceWithDiscount(product: ProductCartInterface): number {
    if (product.discount > 0) {
      const discountAmount = (product.price * product.discount) / 100;
      return product.price - discountAmount;
    } else {
      return product.price;
    }
  }

  getTotalSubtotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + this.getSubtotalPrice(item), 0);
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
      this.updateTotal();
    }
  }

  updateSelectedDeliveryOption(option: string): void {
    this.selectedDeliveryOptionSubject.next(option);
  }

  updateDeliveryCost(cost: number): void {
    this.costDeliveryOptionSubject.next(cost);
    this.updateTotal();
  }

  updateTotal(): void {
    const subTotal = this.getTotalSubtotalPrice();
    const costDelivery = this.costDeliveryOptionSubject.getValue();
    const newTotal = subTotal + costDelivery;
    this.totalSubject.next(newTotal);
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCartItems();
    localStorage.removeItem('cart');
    this.updateSubtotal();
    this.updateTotal();
  }

  private updateSubtotal(): void {
    this.subtotalSubject.next(this.getTotalSubtotalPrice());
  }

  private updateCartItems(): void {
    this.cartItemsSubject.next(this.cartItems);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}