import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';
import { baseURLCustomer, customerLogin, customerRegister } from '../../AppConstants';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  public login_url = " http://localhost:3000";
  public reg_url = " http://localhost:3000";

  constructor(private http:HttpClient, private apiService:ApiService) { }
  authLogin(userLoginDto:any):Observable<any>{
    return this.apiService.post(baseURLCustomer+customerLogin,userLoginDto);
  }

  userRegister(user_dto:any):Observable<any>{

    console.log("User Registeration Data : ",JSON.stringify(user_dto));
    return this.apiService.post(baseURLCustomer+customerRegister,user_dto)
  }

  adminLogin(user_name:any, password:any):Observable<any>{
    return this.apiService.get(this.login_url+'/user?email='+user_name+'&password='+password+'&role=admin');
  }

  saveUserData(data:string)
  {
    localStorage.setItem("CUSTOMER_TOKEN",data);
  }
}