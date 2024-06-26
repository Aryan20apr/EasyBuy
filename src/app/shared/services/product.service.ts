import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';
import { BASE_URL, CATEGORY_URL } from '../../AppConstants';
import { ProductType } from '../../core/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  public product_url=" http://localhost:8085/easybuy/api/v1/product"

  constructor(private httpClient:HttpClient, private apiService:ApiService) { }
  allProduct():Observable<any>{
    return this.apiService.get(this.product_url);
  }
  addNewProduct(product_dto:ProductType):Observable<any>{
    console.log("Product DTO to be uploaded: ",product_dto)
    return this.apiService.post(this.product_url, product_dto);
  }
  singleProduct(id:any){
    return this.apiService.get(this.product_url+id);
  }
  updateProduct(id:any, product_dto:any):Observable<any>{
    return this.apiService.put(this.product_url+id, product_dto);
  }
  deleteProduct(id:any):Observable<any>{
    return this.apiService.delete(this.product_url+id);
  }

  getCategories():Observable<any>
  {
    debugger;
    return this.apiService.get(BASE_URL+CATEGORY_URL);
  }
}