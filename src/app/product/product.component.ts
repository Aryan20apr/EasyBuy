import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ProductService } from '../shared/services/product.service';
import { Product } from '../core/models/product.model';
import { DropzoneComponent } from '../shared/layouts/dropzone/dropzone.component';
import { UploadService } from '../shared/services/upload.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [DropzoneComponent,CommonModule, FormsModule, ReactiveFormsModule,TitleCasePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  all_product_data:any
  addEditProductDForm!:FormGroup;
  addEditProduct:boolean = false;
  popup_header!:string;
  add_prouct!:boolean;
  edit_prouct!:boolean;
  prouct_data:any;
  single_product_data:any;
  product_dto!:Product
  edit_product_id:any;
  files: File[] = [];
  uploadImageUrls:string[]=[];
  uploadProgress:(number|undefined)[] = [];
  isLoading:boolean=false;
  uploadSubscription: any;
  isUploaded!: boolean|null;
  constructor(private uploadService:UploadService,private fb:FormBuilder, private router:Router, private productService:ProductService){

  }

  ngOnInit(): void {
    
    this.addEditProductDForm = this.fb.group({
      name:['',Validators.required],
      // uploadPhoto:['',Validators.required],
      productDesc:['',Validators.required],
      mrp:['',Validators.required],
      dp:['',Validators.required],
      status:['',Validators.required],
    })
    this.getAllProduct()
  }
  get rf(){
    return this.addEditProductDForm.controls;
  }
  getAllProduct(){
    this.productService.allProduct().subscribe({next:(data) =>{
      this.all_product_data = data;
      console.log("My All product", this.all_product_data)
    }, error:(error) =>{
      console.log("Somthing went wrong ", error)
    }})
  }
  addProductPopup(){
    this.isLoading=false;
    this.isUploaded=null;

    this.add_prouct = true;
    this.edit_prouct = false;
    this.popup_header = "Add new Product";
    this.addEditProductDForm.reset();
  }
  onFilesSelected(files: File[]) {
    // Update selected files when files are selected
    this.files = files;
  }
  addNewProduct(){
   
    this.addEditProduct = true;  
      if(this.addEditProductDForm.invalid){
      return;
    }
    this.isLoading=true;
    this.isUploaded=false;
    this.uploadFiles();
    
  }

  createProduct()
  {
    this.uploadSubscription.unsubscribe();
    this.prouct_data = this.addEditProductDForm.value;
    this.product_dto = {
      id:Math.floor(Math.random() * 100) + 1,
      name:this.prouct_data.name,
      uploadPhoto:this.uploadService.imageUrls,
      productDesc:this.prouct_data.productDesc,
      mrp:this.prouct_data.mrp,
      dp:this.prouct_data.dp,
      status:this.prouct_data.status,
    }

   this.uploadSubscription=  this.productService.addNewProduct(this.product_dto).subscribe({next:data=>{
      console.log("Product uploaded: ",data);
      this.isLoading=false;
      this.getAllProduct();
      
      console.log(data)
    },error:error=>{
      console.log("Some error occured while adding new product:", error)
    },
    complete:()=>{
      this.isUploaded=true;
      console.log('complete')
   
  }
  });
  
  }

  uploadFiles() {
    this.uploadProgress = []; // Clear progress array
    let fileCount=0;
  this.uploadSubscription=  this.uploadService.uploadFiles(this.files).subscribe({
     next: (progressArray: (number|undefined)[]) => {
        this.uploadProgress = progressArray;
        console.log(this.uploadProgress)
        
        
        // Extract URLs from progressArray and collect them into uploadedImageUrls array
        // this.uploadImageUrls = progressArray.map(item => item.url);
        
      },
     error: (error) => {
        console.error('Upload error:', error);
      },
      complete:()=>{
          this.createProduct();
      }
      
    }
    );
    
  }
  editProductPopup(id:any){
    this.add_prouct = false;
    this.edit_prouct = true;
    this.popup_header = "Edit Product";
    this.addEditProductDForm.reset();
    this.productService.singleProduct(id).subscribe(data=>{
      this.single_product_data = data;
      console.log("Single Data", this.single_product_data);
      this.edit_product_id = data.id;
      this.addEditProductDForm.setValue({
        name:this.single_product_data.name,
        uploadPhoto:this.single_product_data.uploadPhoto,
        productDesc:this.single_product_data.productDesc,
        mrp:this.single_product_data.mrp,
        dp:this.single_product_data.dp,
        status:this.single_product_data.status
      })
    })
  }
  updateProduct(){
    this.addEditProduct = true;
    if(this.addEditProductDForm.invalid){
      return;
    }
    this.prouct_data = this.addEditProductDForm.value;
    this.product_dto = {
      id:0,
      name:this.prouct_data.name,
      uploadPhoto:this.prouct_data.uploadPhoto,
      productDesc:this.prouct_data.productDesc,
      mrp:this.prouct_data.mrp,
      dp:this.prouct_data.dp,
      status:this.prouct_data.status,
    }
    this.productService.updateProduct(this.edit_product_id,this.product_dto).subscribe(data=>{
      this.getAllProduct();

    },error=>{
      console.log("Some error occured while updating product:", error)
    })
  }
  deleteProduct(id:any){
    console.log("Id for deleting product:",id)
    let conf = confirm("Do you want to delete this product id:" +id);
    if(conf){
      this.productService.deleteProduct(id).subscribe(data=>{
        console.log("Deleted successfull", data);
        this.getAllProduct();
      }, err=>{
        console.log(err)
      })
    }else{
      alert("You pressed cancel !")
    }
  }

  ngOnDestroy() {
    if (this.uploadSubscription) {
      this.uploadSubscription.unsubscribe();
    }
  }
}