import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-image',
  standalone: true,
  imports: [],
  templateUrl: './add-image.component.html',
  styleUrl: './add-image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddImageComponent {
  @Output() fileSelected = new EventEmitter<FileList>();

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.fileSelected.emit(files);
    }
  }
}
