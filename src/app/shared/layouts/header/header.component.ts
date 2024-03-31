import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CUSTOMER_TOKEN, ROLE } from '../../../AppConstants';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLink,FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  logged_in: boolean = false;
  language: string = 'English';
  user_role!: any;
  userToken!:string|null;
  faShoppingCart = faShoppingCart;
  constructor(private router: Router) { }

  ngOnInit(): void {

  }
  ngDoCheck() {
    
    this.user_role = localStorage.getItem(ROLE);
    this.userToken=localStorage.getItem(CUSTOMER_TOKEN)
    if(this.user_role){
      this.logged_in = true;
    }
  }
  logout(){
    
    localStorage.removeItem(CUSTOMER_TOKEN);
    localStorage.removeItem(ROLE);

    this.router.navigateByUrl('/sign-in');
    location.reload();
  }
}