import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-discount',
  standalone: true,
  imports: [],
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiscountComponent {
  @Input() discount : number = 0;
}
