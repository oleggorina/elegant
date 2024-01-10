import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
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

  logout() {
    this.authService.logout();
  }
}
