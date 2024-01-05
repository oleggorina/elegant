import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-validation-message',
  standalone: true,
  imports: [],
  templateUrl: './validation-message.component.html',
  styleUrl: './validation-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationMessageComponent {

}
