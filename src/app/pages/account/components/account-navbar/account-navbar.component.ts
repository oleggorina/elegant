import { ChangeDetectionStrategy, Component, HostListener, inject, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-account-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './account-navbar.component.html',
  styleUrl: './account-navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountNavbarComponent {
  @Input() name: string = '';
  @Input() surname: string = '';
  @Input() role: string = '';
  private authService = inject(AuthService);
  private router = inject(Router)

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
