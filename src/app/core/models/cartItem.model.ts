export interface CartItem {
    id: string
    product: Product
    userId: number
  }
  
  export interface Product {
    id: string
    name: string
    uploadPhoto: string
    productDesc: string
    mrp: string
    dp: string
    status: string
  }
  