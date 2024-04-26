import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageComponent {
  @Input() image: string = '';
  @Input() alt: string = '';
  @Output() removed = new EventEmitter<void>();

  removeImage(): void {
    this.removed.emit();
  }
}
