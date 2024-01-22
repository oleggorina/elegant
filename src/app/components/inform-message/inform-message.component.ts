import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-inform-message',
  standalone: true,
  imports: [],
  templateUrl: './inform-message.component.html',
  styleUrl: './inform-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InformMessageComponent {

}
