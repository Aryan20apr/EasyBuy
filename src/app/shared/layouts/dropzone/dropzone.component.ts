import { AfterViewInit, Component, ComponentFactoryResolver, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import Dropzone from 'dropzone';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { FileDragNDropDirective } from '../../directives/file-drag-ndrop.directive';
import { faImage } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-dropzone',
  standalone: true,
  imports: [FileDragNDropDirective],
  templateUrl: './dropzone.component.html',
  styleUrl: './dropzone.component.css',
  
})
export class DropzoneComponent  {
   public files: any[] = [];
  @Output() filesSelected = new EventEmitter<File[]>();
  faFile:any=faImage;
  constructor(/*private resolver: ComponentFactoryResolver*/ private viewContainerRef: ViewContainerRef) { }

 
  openConfirmDialog(pIndex: number): void {
    // const factory = this.resolver.resolveComponentFactory(DialogConfirmComponent);
    // const componentRef = this.viewContainerRef.createComponent(factory);
    // componentRef.instance.fName = this.files[pIndex].name;
    // componentRef.instance.fIndex = pIndex;

   
      
        this.deleteFromArray(pIndex);
      
      // componentRef.destroy();
    
  }

  onFileChange(pFileList: File[] | FileList|null){
    if(pFileList==null)
      return
      
    this.files = Object.keys(pFileList).map((key:string) => pFileList[Number(key)]);
    this.filesSelected.emit(Array.from(this.files));
  }

  deleteFile(f: File) {
    this.files = this.files.filter(function(w){ return w.name != f.name });
    this.filesSelected.emit(Array.from(this.files));
  }



  deleteFromArray(index:number) {
    console.log(this.files);
    this.files.splice(index, 1);
  }
}
