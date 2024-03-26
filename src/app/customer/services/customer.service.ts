import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../../core/service/api.service';
import { CartItem } from '../../core/models/cartItem.model';
import { Order } from '../../core/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

private single_product_id=new BehaviorSubject(null);
currentProduct=this.single_product_id.asObservable();

public user_url="http://localhost:3000/user/";
  public product_url="http://localhost:3000/products/";
  public order_url="http://localhost:3000/orders/";
  public cart_url="http://localhost:3000/cart/";

  cartItems:CartItem[]=[];


  constructor(private  apiService:ApiService) {

   }

   allProduct():Observable<any>{

    return this.apiService.get(this.product_url);
   }

   quickBuyProduct(product_id:any)
   {
    this.single_product_id.next(product_id)
   }
   individualProduct(id:any)
   {
    return this.apiService.get(this.product_url+id);
   }

   userDetail(id:any)
   {
    return this.apiService.get(this.user_url+id);
   }
   insertNewOrder(order_dto:any):Observable<any>{
    return this.apiService.post(this.order_url,order_dto);
   }
   placeBulkOrder(order_dto:Order[]):Observable<any>{
    return this.apiService.post(this.order_url,order_dto);
   }
   orderDashboardData():Observable<any>{
    return this.apiService.get(this.order_url);
  }
  productDashboardData():Observable<any>{
    return this.apiService.get(this.product_url);
  }

  addToCart(cart_dto:any ):Observable<any>
  {
      return this.apiService.post(this.cart_url,cart_dto);
  }
  getCartItems():Observable<CartItem[]>
  {
    var userId:number=Number(localStorage.getItem('user_session_id'));
    return this.apiService.get(this.cart_url+"?userId"+userId);
  }
}
