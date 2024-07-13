import { ChangeDetectionStrategy, Component, HostListener, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../../../services/wishlist.service';
import { ProductInterface } from '../../../../interface/interfaces';
import { Observable } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { BtnPrimaryComponent } from '../../../../components/buttons/btn-primary/btn-primary.component';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-account-wishlist',
  standalone: true,
  imports: [AsyncPipe, BtnPrimaryComponent, CurrencyPipe, MatProgressSpinnerModule],
  templateUrl: './account-wishlist.component.html',
  styleUrl: './account-wishlist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AccountWishlistComponent implements OnInit {
  private wishlistService = inject(WishlistService);
  private router = inject(Router);
  wishlistProducts$!: Observable<ProductInterface[]>

  ngOnInit(): void {
    this.wishlistProducts$ = this.wishlistService.getWishlist();
  }

  removeProduct(product: ProductInterface): void {
    this.wishlistService.removeFromWishlist(product)
  }

  goToProduct(productId: string): void {
    this.router.navigateByUrl(`product-details/${productId}`)
  }

  @HostListener('window: resize', ['$event'])
  onResize(): number {
    return window.innerWidth;
  }
}
