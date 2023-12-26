import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LinkComponent } from '../../../../components/buttons/link/link.component';

@Component({
  selector: 'app-home-categories',
  standalone: true,
  imports: [LinkComponent],
  templateUrl: './home-categories.component.html',
  styleUrl: './home-categories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeCategoriesComponent {

}
