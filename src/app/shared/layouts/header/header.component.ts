import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CUSTOMER, CUSTOMER_TOKEN, ROLE } from '../../../AppConstants';
import { LoginSignupService } from '../../services/login-signup.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  logged_in: boolean = false;
  isCustomer: boolean = false;
  language: string = 'English';
  user_role!: any;
  userToken!: string | null;
  faShoppingCart = faShoppingCart;
  constructor(private toaster:ToastrService,private router: Router, private loginSignupService: LoginSignupService) { }

  ngOnInit(): void {

  }
  ngDoCheck() {

    this.user_role = localStorage.getItem(ROLE);
    this.userToken = localStorage.getItem(CUSTOMER_TOKEN)
    if (this.user_role) {
      this.logged_in = true;
      this.isCustomer=this.user_role===CUSTOMER ? true :false ;
    }
  }
  logout() {

    
    this.loginSignupService.logout().subscribe({
      next: (data) => {
        console.log("Log Out Data: " + data)

        if (data.code == 2000)

          {
            localStorage.clear()
    //         localStorage.removeItem(CUSTOMER_TOKEN);
    // localStorage.removeItem(ROLE);
          this.router.navigateByUrl('/sign-in');
          location.reload();

          }
          else
          {
            this.toaster.error(data.data)
          }
      }
    })
    // this.router.navigateByUrl('/sign-in');
    // location.reload();
  }
}