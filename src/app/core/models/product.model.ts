export class Product{
    
    name!:string
    uploadPhoto!:string[]|string;
    productDesc!:string;
    mrp!:number;
    dp!:number;
    status!:boolean;
  }

  export type ProductType = {
    productName: string;
    count: number;
    productDescription:string;
    categoryId: number;
    availibility: boolean;
    sellerToken: string;
    markedPrice: number;
    displayPrice: number;
    discountPercent: number;
    orderLimit: number;
    counntryOfOrigin: string;
    imageURLs: string[];
}
