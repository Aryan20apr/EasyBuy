import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

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
  faShoppingCart = faShoppingCart;
  constructor(private router: Router) { }

  ngOnInit(): void {

  }
  ngDoCheck() {
    
    this.user_role = sessionStorage.getItem("role");
    const user_sesson_id = sessionStorage.getItem("user_session_id");
    if(user_sesson_id){
      this.logged_in = true;
    }
  }
  logout(){
    
    sessionStorage.removeItem("user_session_id");
    sessionStorage.removeItem("role");
    this.router.navigateByUrl('/sign-in');
    location.reload();
  }
}