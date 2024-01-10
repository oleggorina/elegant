import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountDetailsComponent {

}
