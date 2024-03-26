import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { firebaseConfig } from './firebase';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';

import { getStorage,provideStorage } from '@angular/fire/storage';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileDragNDropDirective } from './shared/directives/file-drag-ndrop.directive';
import { UploadService } from './shared/services/upload.service';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(withFetch()),importProvidersFrom(FontAwesomeModule),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideStorage(() => getStorage()),
      
    ],
    
    ),
    FileDragNDropDirective
  ]
};
