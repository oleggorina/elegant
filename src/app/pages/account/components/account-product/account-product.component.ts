import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddImageComponent } from '../../../../components/buttons/add-image/add-image.component';
import { BtnPrimaryComponent } from '../../../../components/buttons/btn-primary/btn-primary.component';
import { ImageComponent } from '../../../../components/image/image.component';
import { InformMessageComponent } from '../../../../components/inform-message/inform-message.component';
import { ProductService } from '../../../../services/product.service';
import { SharedService } from '../../../../services/shared.service';

@Component({
  selector: 'app-account-product',
  standalone: true,
  imports: [AddImageComponent, ImageComponent, BtnPrimaryComponent, ReactiveFormsModule, InformMessageComponent],
  templateUrl: './account-product.component.html',
  styleUrl: './account-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountProductComponent implements OnInit {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  productImages: string[] = [];
  productColorImages: string[] = [];
  productFileImages: File[] = [];
  productColorFileImages: File[] = [];
  productForm!: FormGroup;
  message!: string;

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      characteristics: ['', [Validators.required]],
      sku: ['', [Validators.required]],
      category: ['', [Validators.required]]
    })
  }

  addProduct() {
    if (this.productForm.valid) {
      const {title, description, price, discount, characteristics, sku, category} = this.productForm.value;
      this.productService.addProduct(title, description, characteristics, this.productFileImages, this.productColorFileImages, price, discount, sku, category).subscribe({
        next: (res) => {
          this.productImages.splice(0, this.productImages.length);
          this.productColorImages.splice(0, this.productColorImages.length);
          this.productFileImages.splice(0, this.productFileImages.length);
          this.productColorFileImages.splice(0, this.productColorFileImages.length);
          this.productForm.reset();
          this.message = `Product with id ${res.id} added successfully`;
          this.changeDetectorRef.detectChanges();
        },
        error: (e) => {
          console.log(e);
        }
      })
    }
  }

  addImage(files: FileList, imagesArray: string[], filesArray: File[]): void {
    for (let i = 0; i < files.length; i++) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        imagesArray.push(e.target.result);
        this.changeDetectorRef.detectChanges();
      };
      reader.readAsDataURL(files[i]);
      filesArray.push(files[i])
    }
    console.log(this.productImages);
    console.log(this.productFileImages);
  }

  removeImage(image: string, imagesArray: string[], filesArray: File[]): void {
    const index = imagesArray.indexOf(image);
    if (index !== -1) {
      imagesArray.splice(index, 1);
      filesArray.splice(index, 1);
    }
    console.log(this.productImages);
    console.log(this.productFileImages);
  }
}
