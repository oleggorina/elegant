import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { ModalService } from '../../services/modal.service';
import { UserService } from '../../services/user.service';
import { NumberBadgeComponent } from '../badges/number-badge/number-badge.component';
import { BurgerComponent } from '../burger/burger.component';
import { LogoComponent } from '../logo/logo.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NumberBadgeComponent, AsyncPipe, RouterLink, RouterLinkActive, LogoComponent, BurgerComponent, ModalComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, OnDestroy {
  private cartService = inject(CartService)
  private changeDetectorRef = inject(ChangeDetectorRef);
  @Input() cartCount: number = 0;
  modalService = inject(ModalService);
  private userService = inject(UserService);
  userId!: string | null;
  userIdSubscription!: Subscription;
  cartProducts: number = 0;

  ngOnInit(): void {
    this.userIdSubscription = this.userService.getUserId().subscribe((userId) => {
      this.userId = userId;
      this.changeDetectorRef.detectChanges();
    });
    this.cartService.getCartItemsLength().subscribe(length => {
      this.cartProducts = length;
      this.changeDetectorRef.detectChanges();
    })
  }

  ngOnDestroy(): void {
    if (this.userIdSubscription) this.userIdSubscription.unsubscribe();
  }

  openModal() {
    this.modalService.modalIsOpen.next(true);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    return window.innerWidth
  }
}
