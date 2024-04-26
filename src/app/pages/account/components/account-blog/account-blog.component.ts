import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AddImageComponent } from '../../../../components/buttons/add-image/add-image.component';
import { BtnPrimaryComponent } from '../../../../components/buttons/btn-primary/btn-primary.component';
import { InformMessageComponent } from '../../../../components/inform-message/inform-message.component';
import { BlogService } from '../../../../services/blog.service';

@Component({
  selector: 'app-account-blog',
  standalone: true,
  imports: [BtnPrimaryComponent, InformMessageComponent, ReactiveFormsModule, DatePipe, AddImageComponent],
  templateUrl: './account-blog.component.html',
  styleUrl: './account-blog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountBlogComponent implements OnInit {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);
  private blogService = inject(BlogService);
  @ViewChild('mainImageInput') mainImageInput!: ElementRef<HTMLInputElement>;
  @ViewChild('image2Input') image2Input!: ElementRef<HTMLInputElement>;
  @ViewChild('image3Input') image3Input!: ElementRef<HTMLInputElement>;
  @ViewChild('image4Input') image4Input!: ElementRef<HTMLInputElement>;
  articleForm!: FormGroup;
  message!: string;
  mainImage!: string;
  image2!: string;
  image3!: string;
  image4!: string;

  ngOnInit(): void {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required]],
      mainDescr: ['', [Validators.required]],
      mainImage: ['', [Validators.required]],
      subtitle: ['', [Validators.required]],
      descr2: ['', [Validators.required]],
      image2: ['', [Validators.required]],
      image3: ['', [Validators.required]],
      subtitle2: ['', [Validators.required]],
      descr3: ['', [Validators.required]],
      image4: ['', [Validators.required]],
      subtitle3: ['', [Validators.required]],
      descr4: ['', [Validators.required]],
    })
  }

  addArticle() {
    if (this.articleForm.valid) {
      const { title, mainDescr, subtitle, descr2, subtitle2, descr3, subtitle3, descr4 } = this.articleForm.value;
      const mainImage = this.getFile(this.mainImageInput);
      const image2 = this.getFile(this.image2Input);
      const image3 = this.getFile(this.image3Input);
      const image4 = this.getFile(this.image4Input);
      this.blogService.addArticle(title, mainDescr, subtitle, descr2, subtitle2, descr3, subtitle3, descr4, mainImage, image2, image3, image4).subscribe({
        next: () => {
          this.articleForm.reset();
          this.mainImage = '';
          this.image2 = '';
          this.image3 = '';
          this.image4 = '';
          this.message = 'Article added successfully !';
          this.changeDetectorRef.detectChanges();
        },
        error: () => {
          this.message = 'There was an error adding article, contact your administrator or try again later';
          this.changeDetectorRef.detectChanges();
        }
      })
    }
  }

  onSelectFile(event: any, index: number) {
    const file: File = event.target.files[0];
    if (file) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        switch (index) {
          case 1:
            this.mainImage = e.target.result;
            break;
          case 2:
            this.image2 = e.target.result;
            break;
          case 3: 
            this.image3 = e.target.result;
            break;
          case 4:
            this.image4 = e.target.result;
            break;
          default:
            break;
        }
        this.changeDetectorRef.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  private getFile(inputRef: ElementRef<HTMLInputElement>): File | undefined {
    if (inputRef && inputRef.nativeElement.files && inputRef.nativeElement.files.length > 0) {
      return inputRef.nativeElement.files[0];
    }
    return undefined;
  }
}
