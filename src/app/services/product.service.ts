import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDownloadURL,  ref, uploadBytes } from '@angular/fire/storage';
import { getStorage } from 'firebase/storage';
import { forkJoin, from, Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProductInterface } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private firebaseApp = initializeApp(environment.firebaseConfig);
  private storage = getStorage(this.firebaseApp);
  private url: string = 'https://ecommerce-88694-default-rtdb.europe-west1.firebasedatabase.app/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(`${this.url}.json`);
  }

  getProduct(id: string): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(`${this.url}/${id}.json`);
  }

  addProduct(title: string, description: string, characteristics: string, productImages: File[], productColorImages: File[],
    price: number, discount: number, sku: string, category: string): Observable<ProductInterface> {

    const uploadImages = (images: File[], folderName: string): Observable<string[]> => {
      const storageRef = ref(this.storage, `product-images/${title}`);
      const uploadTasks: Observable<string>[] = [];

      images.forEach((image) => {
        const childRef = ref(storageRef, `${folderName}/${image.name}`)
        const task$ = from(uploadBytes(childRef, image)).pipe(
          switchMap(() => getDownloadURL(childRef))
        )
        uploadTasks.push(task$)
      });
      return forkJoin(uploadTasks)
    }

    const uploadTasks = [
      uploadImages(productImages, 'images'),
      uploadImages(productColorImages, 'colors')
    ]

    return forkJoin(uploadTasks).pipe(
      switchMap(([productImageUrl, colorImageUrl]) => {
        const colorImageNames = productColorImages.map(image => {
          const extensionIndex = image.name.lastIndexOf('.');
          return image.name.substring(0, extensionIndex);
          
        });
        return this.http.post<{name: string}>(`${this.url}.json`, {
          title: title,
          description: description,
          price: price,
          discount: discount,
          sku: sku,
          category: category,
          characteristics: characteristics,
          images: productImageUrl.map((url) => ({url})),
          colors: colorImageUrl.map((url, index) => ({url, name: colorImageNames[index]}))
        }).pipe(
          switchMap((response) => {
            return this.http.patch<ProductInterface>(`${this.url}/${response.name}.json`, {
              id: response.name
            })
          })
        )
      })
    )
  }
}
