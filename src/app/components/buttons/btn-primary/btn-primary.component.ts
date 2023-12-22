import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-btn-primary',
  standalone: true,
  imports: [],
  templateUrl: './btn-primary.component.html',
  styleUrl: './btn-primary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BtnPrimaryComponent {

}
