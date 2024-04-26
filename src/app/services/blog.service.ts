import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { forkJoin, from, Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { BlogInterface } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private firebaseApp = initializeApp(environment.firebaseConfig);
  private storage = getStorage(this.firebaseApp);
  private url: string = 'https://ecommerce-88694-default-rtdb.europe-west1.firebasedatabase.app/articles';

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  getArticles(): Observable<BlogInterface[]> {
    return this.http.get<BlogInterface[]>(`${this.url}.json`);
  }

  getArticle(id: string): Observable<BlogInterface> {
    return this.http.get<BlogInterface>(`${this.url}/${id}.json`);
  }

  addArticle(title: string, mainDescr: string, subtitle: string, descr2: string,
    subtitle2: string, descr3: string, subtitle3: string, descr4: string, mainImage: File | undefined,
    image2: File | undefined, image3: File | undefined, image4: File | undefined): Observable<BlogInterface> {
    if (!mainImage || !image2 || !image3 || !image4) {
      throw new Error('One or more files are undefined.');
    }
    const currentDate = this.datePipe.transform(new Date(), 'MMMM dd, yyyy')
    
    const uploadFileAndGetUrl = (file: File): Observable<string> => {
      const storageRef = ref(this.storage, `blog-images/${file.name}`);
      return from(uploadBytes(storageRef, file)).pipe(
        switchMap(() => getDownloadURL(storageRef))
      )
    }
    const uploadTasks = [
      uploadFileAndGetUrl(mainImage),
      uploadFileAndGetUrl(image2),
      uploadFileAndGetUrl(image3),
      uploadFileAndGetUrl(image4),
    ]
    return forkJoin(uploadTasks).pipe(
      switchMap(([mainImageURL, image2URL, image3URL, image4URL]) => {
        return this.http.post<{name: string}>(`${this.url}/.json`, {
          title: title,
          mainDescr: mainDescr,
          subtitle: subtitle,
          descr2: descr2,
          subtitle2: subtitle2,
          descr3: descr3,
          subtitle3: subtitle3,
          descr4: descr4,
          mainImage: mainImageURL,
          image2: image2URL,
          image3: image3URL,
          image4: image4URL,
          createdAt: currentDate
        }).pipe(
          switchMap((response) => {
            return this.http.patch<BlogInterface>(`${this.url}/${response.name}.json`, {
              id: response.name
            });
          })
        )
      })
    )
  }
}
