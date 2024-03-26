import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-buyer-dashboad',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.css'
})
export class BuyerDashboardComponent implements OnInit{
  all_products:any;
  show_Checkout:boolean =false;
  cartProduct:any;
  user_id!:number;


  constructor(private router:Router, private customerService:CustomerService){}

  ngOnInit(): void {
  this.getAllProduct()
  this.user_id = Number(sessionStorage.getItem('user_session_id'));
  }
  getAllProduct(){
    this.customerService.allProduct().subscribe(data=>{
      this.all_products = data;
      console.log(this.all_products)
    },error=>{
      console.log("My error", error)
    })
  }

  buyProduct(id:number){
    this.show_Checkout = true;
    this.customerService.quickBuyProduct(id);
    this.router.navigateByUrl('/checkout');
  }
  addToCart(itemIndex:number){
    
    this.cartProduct={
      product:this.all_products[itemIndex],
      userId:this.user_id
    }
    this.customerService.addToCart(this.cartProduct).subscribe({
      next:(data)=>{
          console.log("Item added to cart successfully")
      },
      error:(error)=>{
          console.error("Error occured while adding to cart:",error)
      }
    });
    }
    
}
