import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ProductService } from '../shared/services/product.service';
import { Product, ProductType } from '../core/models/product.model';
import { DropzoneComponent } from '../shared/layouts/dropzone/dropzone.component';
import { UploadService } from '../shared/services/upload.service';
import { map } from 'rxjs';
import { SELLER_TOKEN } from '../AppConstants';
import { CategoryType } from '../core/models/category.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [DropzoneComponent,CommonModule, FormsModule, ReactiveFormsModule,TitleCasePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  all_product_data:any
  allCategories!:CategoryType[]
  addEditProductDForm!:FormGroup;
  addEditProduct:boolean = false;
  popup_header!:string;
  add_prouct!:boolean;
  edit_prouct!:boolean;
  product_data:any;
  single_product_data:any;
  product_dto!:ProductType
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
  
    this.getCategories();
    
    this.addEditProductDForm = this.fb.group({
      name:['',Validators.required],
      // uploadPhoto:['',Validators.required],
      productDesc:['',Validators.required],
      mrp:['',Validators.required],
      dp:['',Validators.required],
      productCount:['',Validators.required],
      orderLimit:['',Validators.required],
      countryOfOrigin:['',Validators.required],
      categoryId : ['',Validators.required],

      status:['',Validators.required]

    })
    //this.getAllProduct()
  }
  getCategories()
  {
    debugger;
    this.productService.getCategories().subscribe({
      next : (data) =>{
        console.log("Category data:",data);

        this.allCategories=data.data;
      },
      error :(error)=>{
        console.error(error);
      }
    })
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
    //this.createProduct();
  }

  createProduct()
  {
    //this.uploadSubscription.unsubscribe();
    this.product_data = this.addEditProductDForm.value;
    this.product_dto = {
     
      productName:this.product_data.name,
      imageURLs:this.uploadService.imageUrls,
      productDescription:this.product_data.productDesc,
      markedPrice:Number(this.product_data.mrp),
      displayPrice:Number(this.product_data.dp),
      orderLimit:Number(this.product_data.orderLimit),
      countryOfOrigin:this.product_data.countryOfOrigin,
      availibility:Boolean(this.product_data.status),
      categoryId:Number(this.product_data.categoryId),
      count:Number(this.product_data.productCount),
      discountPercent:Number(this.calculateDiscount(Number(this.product_data.mrp),Number(this.product_data.dp))),
      sellerToken:localStorage.getItem(SELLER_TOKEN)??''
    }

   this.uploadSubscription=  this.productService.addNewProduct(this.product_dto).subscribe({next:data=>{
      console.log("Product uploaded: ",data);
      this.isLoading=false;
      this.getAllProduct();
      
      console.log("Product upload data: ",data)
    },error:error=>{
      this.isUploaded=true;
      this.isLoading=false;
      console.log("Some error occured while adding new product:", error)
    },
    complete:()=>{
      this.isUploaded=true;
      console.log('product upload complete')
   
  }
  });
  
  }

  calculateDiscount(mp:number,dp:number):number {
    return ((mp-dp)/dp)*100;
  }

  uploadFiles() {
    this.uploadProgress = []; // Clear progress array
    let fileCount=0;
  this.uploadSubscription=  this.uploadService.uploadFiles(this.files).subscribe({
     next: (progress: (number|undefined)) => {
        // this.uploadProgress = progressArray;
        console.log(progress)
        
        
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
    this.product_data = this.addEditProductDForm.value;
    this.product_dto = {
     
      productName:this.product_data.name,
      imageURLs:this.uploadService.imageUrls,
      productDescription:this.product_data.productDesc,
      markedPrice:this.product_data.mrp,
      displayPrice:this.product_data.dp,
      orderLimit:this.product_data.orderLimit,
      countryOfOrigin:this.product_data.countryOfOrigin,
      availibility:this.product_data.status,
      categoryId:this.product_data.status,
      count:this.product_data.count,
      discountPercent:this.calculateDiscount(Number(this.product_data.mrp),Number(this.product_data.dp)),
      sellerToken:localStorage.getItem(SELLER_TOKEN)??''
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