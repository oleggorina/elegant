import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BtnPrimaryComponent } from '../../buttons/btn-primary/btn-primary.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [BtnPrimaryComponent, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {

}
