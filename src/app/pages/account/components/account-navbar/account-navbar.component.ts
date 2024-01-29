import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { UserInterface } from '../../../../interface/interfaces';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-account-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './account-navbar.component.html',
  styleUrl: './account-navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountNavbarComponent implements OnInit {
  private router = inject(Router)
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private changeDetectorRef = inject(ChangeDetectorRef)
  user$!: Observable<UserInterface | null>;

  ngOnInit(): void {
    this.user$ = this.userService.user$;
    this.user$.subscribe(() => {
      this.changeDetectorRef.detectChanges();
    })
  }

  onMenuChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.router.navigateByUrl(`/account/${selectedValue}`);
    if (selectedValue === 'logout') {
      this.logout();
    }
  }

  @HostListener('window:resize', ['event'])
  onResize() {
    return window.innerWidth;
  }

  logout(): void {
    this.authService.logout();
  }
}
