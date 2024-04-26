import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-number-badge',
  standalone: true,
  imports: [],
  templateUrl: './number-badge.component.html',
  styleUrl: './number-badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberBadgeComponent {

}
