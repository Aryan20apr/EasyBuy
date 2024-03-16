import { Address } from "./address.model";
import { Product } from "./product.model";

export class Order{
    id!:number;
    userId!:number;
    sellerId!:number;
    product!:Product;
    deliveryAddress!:Address;
    contact!:number;
    dateTime!:string;
  }