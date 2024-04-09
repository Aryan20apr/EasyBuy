import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { firebaseConfig } from './firebase';

import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat'
import {provideAnimations} from '@angular/platform-browser/animations'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileDragNDropDirective } from './shared/directives/file-drag-ndrop.directive';
import { UploadService } from './shared/services/upload.service';
import { provideToastr } from 'ngx-toastr';
import { httpInterceptor } from './core/interceptors/http.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(withFetch(),withInterceptors([httpInterceptor,loadingInterceptor])), 
    provideToastr(),
    provideAnimations(),
    importProvidersFrom([FontAwesomeModule,
    AngularFireModule.initializeApp(firebaseConfig), 
    AngularFireStorageModule,
    



  ],

  ),
    UploadService,
    FileDragNDropDirective,

  ]
};

