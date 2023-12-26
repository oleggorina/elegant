import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-values',
  standalone: true,
  imports: [],
  templateUrl: './home-values.component.html',
  styleUrl: './home-values.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeValuesComponent {

}
