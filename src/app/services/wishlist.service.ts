import { Injectable } from '@angular/core';
import { ProductInterface } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: ProductInterface[] = [];
  constructor() { }

  addToWishlist(product: ProductInterface): void {
    this.wishlist.push(product);
  }

  removeFromWishlist(product: ProductInterface): void {
    const index = this.wishlist.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.wishlist.splice(index, 1);
    }
  }

  isInWishlist(product: ProductInterface): boolean {
    return this.wishlist.some(item => item.id === product.id);
  }

  getWishlist(): ProductInterface[] {
    return this.wishlist;
  }
}
