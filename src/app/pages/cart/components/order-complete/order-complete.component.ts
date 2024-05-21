import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-order-complete',
  standalone: true,
  imports: [],
  templateUrl: './order-complete.component.html',
  styleUrl: './order-complete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderCompleteComponent {

}
