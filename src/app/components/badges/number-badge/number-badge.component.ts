import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-number-badge',
  standalone: true,
  imports: [NgClass],
  templateUrl: './number-badge.component.html',
  styleUrl: './number-badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberBadgeComponent {
  @Input() state: string = '';
}
