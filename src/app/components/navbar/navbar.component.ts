import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { UserService } from '../../services/user.service';
import { BurgerComponent } from '../burger/burger.component';
import { LogoComponent } from '../logo/logo.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AsyncPipe, RouterLink, RouterLinkActive, LogoComponent, BurgerComponent, ModalComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, OnDestroy {
  private changeDetectorRef = inject(ChangeDetectorRef);
  @Input() cartCount: number = 0;
  modalService = inject(ModalService);
  userService = inject(UserService);
  userId!: string | null;
  userIdSubscription!: Subscription;

  ngOnInit(): void {
    this.userIdSubscription = this.userService.getUserId().subscribe((userId) => {
      this.userId = userId;
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
