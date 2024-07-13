import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { BtnPrimaryComponent } from '../buttons/btn-primary/btn-primary.component';
import { LogoComponent } from '../logo/logo.component';
import { ModalComponent } from '../modal/modal.component';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-burger',
  standalone: true,
  imports: [AsyncPipe, ModalComponent, RouterLink, RouterLinkActive, LogoComponent, BtnPrimaryComponent],
  templateUrl: './burger.component.html',
  styleUrl: './burger.component.scss',
  animations: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BurgerComponent implements OnInit, OnDestroy {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);
  private subscriptions: Subscription = new Subscription();
  isMenuOpen: boolean = false;
  cartCount: number = 0;
  wishListCount: number = 0;
  modalService = inject(ModalService);

  ngOnInit(): void {
    this.subscriptions.add(
      this.cartService.getCartItemsLength().subscribe({
        next: (count) => {
          this.cartCount = count;
          this.changeDetectorRef.detectChanges();
        },
        error: (error) => console.log(error)        
      })
    );
    this.subscriptions.add(
      this.wishlistService.getWishlistItemsLength().subscribe({
        next: (count) => {
          this.wishListCount = count;
          this.changeDetectorRef.detectChanges();
        }
      })
    )
  }

  ngOnDestroy(): void {
    if (this.subscriptions) this.subscriptions.unsubscribe();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openModal() {
    this.modalService.modalIsOpen.next(true);
  }
}
