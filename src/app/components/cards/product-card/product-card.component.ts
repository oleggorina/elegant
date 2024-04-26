import { CurrencyPipe, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductInterface } from '../../../interface/interfaces';
import { WishlistService } from '../../../services/wishlist.service';
import { DiscountComponent } from '../../badges/discount/discount.component';
import { NewProductComponent } from '../../badges/new-product/new-product.component';
import { BtnPrimaryComponent } from '../../buttons/btn-primary/btn-primary.component';
import { WishlistComponent } from '../../buttons/wishlist/wishlist.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [BtnPrimaryComponent, CurrencyPipe, NgStyle, RouterLink, WishlistComponent, NewProductComponent, DiscountComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit {
  private wishlistService = inject(WishlistService);
  @Input() product!: ProductInterface;
  isInWishlist!: boolean;
  appProductPrice: any;

  ngOnInit(): void {
    this.isInWishlist = this.wishlistService.isInWishlist(this.product);
  }

  toggleWishlist(): void {
    if (this.isInWishlist) {
      this.removeFromWishlist();
    } else {
      this.addToWishlist();
    }
  }

  addToWishlist(): void {
    this.wishlistService.addToWishlist(this.product);
    this.isInWishlist = true;
  }

  removeFromWishlist(): void {
    this.wishlistService.removeFromWishlist(this.product);
    this.isInWishlist = false;
  }

  calculateNewPrice(): number {
    const discountAmount = (this.product.price * this.product.discount) / 100;
    const newPrice = this.product.price - discountAmount;
    return newPrice;
  }
}
