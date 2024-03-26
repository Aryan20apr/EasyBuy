import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../../../shared/services/product.service';
import { CartItem } from '../../../core/models/cartItem.model';
import { ApiService } from '../../../core/service/api.service';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FontAwesomeModule,CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  trash=faTrash;
  cart_products!:CartItem[]
  total:number=0

  constructor(private customerService:CustomerService, private router:Router){}
  
  ngOnInit(): void {
      
      this.customerService.getCartItems().subscribe(
        { next:(data)=>{
            this.cart_products=data

            console.log("Cart Data obtained: ",this.cart_products);

            for(let prod of data)
            {
              this.total+=Number(prod.product.dp)
            }
            this.customerService.cartItems=data;
      },
      error:(error)=>{
        console.error("Error occured while getting cart data ",error)
      }
    }
      )
  }

  goToCheckout(){
    this.router.navigateByUrl("/cart-checkout")

  }

}
