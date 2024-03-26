import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { firebaseConfig } from './firebase';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp, initializeApp as initializeApp_alias, FirebaseApp } from '@angular/fire/app';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import {AngularFireModule} from  '@angular/fire/compat'

import { getStorage,provideStorage } from '@angular/fire/storage';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileDragNDropDirective } from './shared/directives/file-drag-ndrop.directive';
import { UploadService } from './shared/services/upload.service';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(withFetch()),importProvidersFrom([FontAwesomeModule,
    AngularFireModule.initializeApp(firebaseConfig),AngularFireStorageModule,
  
      // provideFirebaseApp(
       
      //   () => initializeApp(firebaseConfig)
      //   ),
      // provideStorage(() => getStorage()),
      
    ],
    
    ),
    UploadService,
    FileDragNDropDirective, 
    
  ]
};
