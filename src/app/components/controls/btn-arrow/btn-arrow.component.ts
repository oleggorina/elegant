import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-arrow',
  standalone: true,
  imports: [],
  templateUrl: './btn-arrow.component.html',
  styleUrl: './btn-arrow.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BtnArrowComponent {
  @Input() sideClass = '';
}
