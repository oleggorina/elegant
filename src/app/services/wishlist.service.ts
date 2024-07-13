import { Injectable } from '@angular/core';
import { ProductInterface } from '../interface/interfaces';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistSubject: BehaviorSubject<ProductInterface[]> = new BehaviorSubject<ProductInterface[]>([]);
  wishlist$: Observable<ProductInterface[]> = this.wishlistSubject.asObservable();

  constructor() { 
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      this.wishlistSubject.next(JSON.parse(storedWishlist));
    }
  }

  addToWishlist(product: ProductInterface): void {
    const currentWishlist = this.wishlistSubject.value;
    if (!currentWishlist.some(item => item.id === product.id)) {
      const updatedWishlist = [...currentWishlist, product];
      this.wishlistSubject.next(updatedWishlist);
      this.updateLocalStorage();
    }
  }

  removeFromWishlist(product: ProductInterface): void {
    const currentWishlist = this.wishlistSubject.value;
    const updatedWishlist = currentWishlist.filter(item => item.id !== product.id);
    this.wishlistSubject.next(updatedWishlist);
    this.updateLocalStorage();
  }

  isInWishlist(product: ProductInterface): boolean {
    return this.wishlistSubject.value.some(item => item.id === product.id);
  }

  getWishlist(): Observable<ProductInterface[]> {
    return this.wishlist$;
  }

  getWishlistItemsLength(): Observable<number> {
    return this.wishlist$.pipe(
      map(items => items.length)
    );
  }

  private updateLocalStorage(): void {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlistSubject.value));
  }
}

// import { Injectable } from '@angular/core';
// import { ProductInterface } from '../interface/interfaces';
// <<<<<<< HEAD
// =======
// <<<<<<< HEAD
// =======
// import { BehaviorSubject, map, Observable } from 'rxjs';
// >>>>>>> ecc1c97 (Update cart, wishlist, orders components, optimized routes, small code refactoring)
// >>>>>>> c881331 (Updated cart, wishlist, orders components. Optimized routes and small code refactoring)

// @Injectable({
//   providedIn: 'root'
// })
// export class WishlistService {
// <<<<<<< HEAD
// =======
// <<<<<<< HEAD
// >>>>>>> c881331 (Updated cart, wishlist, orders components. Optimized routes and small code refactoring)
//   private wishlist: ProductInterface[] = [];
//   constructor() { }

//   addToWishlist(product: ProductInterface): void {
//     this.wishlist.push(product);
//   }

//   removeFromWishlist(product: ProductInterface): void {
//     const index = this.wishlist.findIndex(item => item.id === product.id);
//     if (index !== -1) {
//       this.wishlist.splice(index, 1);
//     }
//   }

//   isInWishlist(product: ProductInterface): boolean {
//     return this.wishlist.some(item => item.id === product.id);
//   }

//   getWishlist(): ProductInterface[] {
//     return this.wishlist;
// <<<<<<< HEAD
// =======
// =======
//   private wishlistSubject: BehaviorSubject<ProductInterface[]> = new BehaviorSubject<ProductInterface[]>([]);
//   wishlist$: Observable<ProductInterface[]> = this.wishlistSubject.asObservable();

//   constructor() { 
//     const storedWishlist = localStorage.getItem('wishlist');
//     if (storedWishlist) {
//       this.wishlistSubject.next(JSON.parse(storedWishlist));
//     }
//   }

//   addToWishlist(product: ProductInterface): void {
//     const currentWishlist = this.wishlistSubject.value;
//     if (!currentWishlist.some(item => item.id === product.id)) {
//       const updatedWishlist = [...currentWishlist, product];
//       this.wishlistSubject.next(updatedWishlist);
//       this.updateLocalStorage();
//     }
//   }

//   removeFromWishlist(product: ProductInterface): void {
//     const currentWishlist = this.wishlistSubject.value;
//     const updatedWishlist = currentWishlist.filter(item =>item.id !== product.id);
//     this.wishlistSubject.next(updatedWishlist);
//     this.updateLocalStorage();
//   }

//   isInWishlist(product: ProductInterface): boolean {
//     return this.wishlistSubject.value.some(item => item.id === product.id);
//   }

//   getWishlist(): Observable<ProductInterface[]> {
//     return this.wishlist$;
//   }

//   getWishlistItemsLength(): Observable<number> {
//     return this.wishlist$.pipe(
//       map(items => items.length)
//     )
//   }

//   private updateLocalStorage(): void {
//     localStorage.setItem('wishlist', JSON.stringify(this.wishlistSubject.value));
// >>>>>>> ecc1c97 (Update cart, wishlist, orders components, optimized routes, small code refactoring)
// >>>>>>> c881331 (Updated cart, wishlist, orders components. Optimized routes and small code refactoring)
//   }
// }
