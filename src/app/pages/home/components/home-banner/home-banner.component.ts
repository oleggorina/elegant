import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LinkComponent } from '../../../../components/buttons/link/link.component';

@Component({
  selector: 'app-home-banner',
  standalone: true,
  imports: [LinkComponent],
  templateUrl: './home-banner.component.html',
  styleUrl: './home-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeBannerComponent {

}
