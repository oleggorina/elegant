import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { provideFirestore, getFirestore } from '@angular/fire/firestore'
import { provideRouter } from '@angular/router';
import { environment } from '../environments/environment';

import { routes } from './app.routes';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  importProvidersFrom(
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ), 
  importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"ecommerce-88694","appId":"1:887966100426:web:819a5891c32f95cf747d33","databaseURL":"https://ecommerce-88694-default-rtdb.europe-west1.firebasedatabase.app","storageBucket":"ecommerce-88694.appspot.com","apiKey":"AIzaSyAMQuZuO9-2PJm_CxmDjuPfjzYUU-nZJM0","authDomain":"ecommerce-88694.firebaseapp.com","messagingSenderId":"887966100426"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
