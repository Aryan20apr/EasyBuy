import { Component, OnInit } from '@angular/core';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { CommonModule } from '@angular/common';
import { FormsModule, } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit{

  signInFormValue:any={};
  user_data:any;

  constructor(private router:Router,private loginService:LoginSignupService)
  {
    
  }
  ngOnInit(): void {
    
  }

  onSubmitSignIn(){
    this.loginService.adminLogin(this.signInFormValue.userEmail,this.signInFormValue.userPassword).subscribe(data=>{
      this.user_data=data;

      if(this.user_data.length==1)
      {
        sessionStorage.setItem("user_session_id", this.user_data[0].id);
        sessionStorage.setItem("role", this.user_data[0].role);
        this.router.navigateByUrl('/admin-dashboard');

      }
      else
      {
        alert("Invalid Response")
      }
      console.log(this.user_data);
    },
    error=>{
      console.log("Error Occured while logging in admin:",error)
    }
    )
  }
}
