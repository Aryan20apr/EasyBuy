// import { HttpClient, HttpEventType } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Cloudinary } from '@cloudinary/url-gen';
// import { Observable, Subject, catchError, filter, forkJoin, map } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UploadService {
//   constructor(private http: HttpClient) { }

//   uploadFile(file: File): Observable<{ progress: number; url: string }> {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', 'howadtwd');

//     const uploadProgress$: Subject<number> = new Subject<number>();
//     const uploadCompleted$: Subject<string> = new Subject<string>();

//     const uploadRequest = this.http.post<any>('https://api.cloudinary.com/v1_1/dnw5udd2u/image/upload', formData, {
//       reportProgress: true,
//       observe: 'events'
//     }).pipe(
//       map((event: any) => {
//         console.log(event);
//         if (event.type === HttpEventType.UploadProgress) {
//           const progress = Math.round((100 * event.loaded) / event.total);
//           uploadProgress$.next(progress);
//         } else if (event.type === HttpEventType.Response && event.body && event.body.secure_url) {
//           uploadCompleted$.next(event.body.secure_url);
//         }
//         return { progress: 0, url: '' };
//       }),
//       catchError((error) => {
//         console.log(`Failed to upload image : ${error}`);
//         uploadCompleted$.error(error);
//         return [];
//       })
//     );

//     return forkJoin([uploadProgress$, uploadCompleted$]).pipe(
//       map(([progress, url]) => ({ progress, url }))
//     );
//   }

//   uploadFiles(files: File[]): Observable<{ progress: number; url: string }[]> {
//     const observables: Observable<{ progress: number; url: string }>[] = [];

//     files.forEach(file => {
//       observables.push(this.uploadFile(file));
//       console.log("Uplaoding File:",file)
//     });

//     return forkJoin(observables);
//   }
// }

import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, Subject, forkJoin } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { BASE_URL, UPLOAD } from '../../AppConstants';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private basePath = '/uploads';
  imageUrls:string[]=[];
  constructor(private storage: AngularFireStorage,private httpClient:HttpClient) { }
  
  private progressSubject = new Subject<number>();
  /** Observable of all messages */
  progress$ = this.progressSubject.asObservable();

  uploadFiles(files: File[]):Observable<number |undefined> /*Observable<(number | undefined)[]> */
  {
    //const uploadObservables: Observable<number|undefined>[] = [];

    // files.forEach(file => {
    //   const uploadTask = this.uploadFileHttp(file);
    //   uploadObservables.push(uploadTask);
    // });
    // uploadObservables.push(uploadTask);

    // return forkJoin(uploadObservables);

    return this.uploadFileHttp(files);
  
  }
  uploadFileFire(file:File): Observable<number | undefined> {
    const filePath = `${this.basePath}/${file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe((downloadURL: string) => {
         const url = downloadURL;
          //fileUpload.name = fileUpload.file.name;
          debugger;
          this.saveFileData(downloadURL);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  
  uploadFileHttp(filesUpload: File[]):Observable<number | undefined>
  {    
    const formData = new FormData();
  
    
      // formData.append('images', filesUpload);

      for (const element of filesUpload) {
        formData.append("images", element)
      }
    
    
    this.httpClient.post(BASE_URL+UPLOAD,formData,{
      reportProgress: true,
      observe: 'events',
    }).subscribe(event => {

      switch (event.type) {
        case HttpEventType.UploadProgress:
          console.log('Uploaded ' + event.loaded + ' out of ' + event.total + ' bytes');
          this.progressSubject.next((event.loaded/event.total!)*100);
          break;
        case HttpEventType.Response:
          console.log('Finished uploading!');
          this.progressSubject.complete();
          
          break;
      }
    });
    return  this.progress$;
  }


  

  private saveFileData(imageUrl:string): void {
    console.log("Image url obtained is: ",imageUrl)
    //this.db.list(this.basePath).push(fileUpload);
    this.imageUrls.push(imageUrl);
  }

  // getFiles(numberItems: number): AngularFireList<FileUpload> {
  //   return this.db.list(this.basePath, ref =>
  //     ref.limitToLast(numberItems));
  // }

  // private uploadFile(file: File): Observable<{ progress: number; url: string }> {
  //   const filePath = `uploads/${file.name}`;
  //   const fileRef = ref(this.storage,file.name);
  //   const uploadTask = uploadBytesResumable(fileRef, file);//this.storage.upload(filePath, file);

  //   return new Observable(observer => {
  //     // const uploadProgress$ = uploadTask.percentageChanges().pipe(
  //     //   map(progress => ({ progress, url: null }))
  //     // );

  //     uploadTask.snapshot.pipe(
  //       finalize(() => {
  //         const downloadUrl$ = fileRef.getDownloadURL();
  //         downloadUrl$.subscribe(url => {
  //           observer.next({ progress: 100, url }); // Set progress to 100% and provide URL
  //           observer.complete();
  //         });
  //       })
  //     ).subscribe();

  //     return () => {
  //       uploadTask.cancel(); // Cancel upload if needed
  //     };
  //   });
  // }
}
