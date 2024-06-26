import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../core/models/user.model';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
declare var $: any;
@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css'
})
export class UserCrudComponent implements OnInit{
  all_user_data:any;
  single_user_data:any;
  addEditUserForm!:FormGroup;
  user_dto!:User;
  user_reg_data:any;
  edit_user_id:any;
  upload_file_name!:string;
  addEditUser:boolean = false; // For Form validation
  add_user:boolean = false;
  edit_user:boolean = false;
  popup_header!:string;
  signInFormValue:any ={}

  @ViewChild('myModal',{static:true}) modalElement!: ElementRef;

  constructor(private adminService:AdminService,private formBuilder:FormBuilder,private router:Router){}
  ngOnInit(): void {
    this.getAllUser();
    this.addEditUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobNumber: ['', Validators.required,Validators.maxLength(10),
      Validators.maxLength(10)
    ],
      age: ['', Validators.required,Validators.max(100)],
      dob: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.min(6)]],
      addLine1: ['', Validators.required],
      addLine2: [],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required,Validators.maxLength(6),Validators.minLength(6)],
      language: ['', Validators.required],
      gender: ['', Validators.required],
      aboutYou: ['', Validators.required,Validators.maxLength(200)],
      uploadPhoto: ['', Validators.required],
      agreetc: ['', Validators.required],
      role: ['', Validators.required],
    })
  }

  getAllUser(){
    this.adminService.allUser().subscribe(data =>{
      this.all_user_data = data;
    },)
  }
  get rf(){
    return this.addEditUserForm.controls;
  }
  addUserPopup()
  {
    this.edit_user=false;
    this.add_user=true;
    this.popup_header="Add new user";
    this.addEditUserForm.reset();
  }

  addUser()
  {
    this.addEditUser=true;
    if(this.addEditUserForm.invalid)
    {

      //alert('Error!! :-)\n\n' +JSON.stringify(this.addEditUserForm.value));
      return;
    }
    this.user_reg_data=this.addEditUserForm.value;
    this.user_dto={
      
      age:this.user_reg_data.age,
     
      
      email:this.user_reg_data.email,
      gender:this.user_reg_data.gender,
      address:{
        houseNumber:this.user_reg_data.houseNumber,
        addLine1: this.user_reg_data.addLine1,
        addLine2: this.user_reg_data.addLine2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        zipCode: this.user_reg_data.zipCode,
      },
      
      mobNumber:this.user_reg_data.mobNumber,
      name:this.user_reg_data.name,
      password:this.user_reg_data.password,
     
      roles:this.user_reg_data.role
    }
    this.adminService.addUser(this.user_dto).subscribe(data=>{
      this.addEditUserForm.reset();
      this.getAllUser();
      $('#addEditUserModal').modal('toggle');
    // this.modalElement.nativeElement.style.display = 'block';
    },error=>{
      console.log("my wrong ", error);
    })
  }
  editUserPopup(user_id:any){
    this.edit_user_id = user_id;
    this.edit_user = true;
    this.add_user = false;
    this.popup_header = "Edit User";
    this.adminService.singleuUser(user_id).subscribe(data=>{
      this.single_user_data = data;
      this.upload_file_name = this.single_user_data.uploadPhoto;
      this.addEditUserForm.setValue({
        name:this.single_user_data.name,
        mobNumber:this.single_user_data.mobNumber,
        age:this.single_user_data.age,
        dob:this.single_user_data.dob,
        email:this.single_user_data.email,
        password:this.single_user_data.password,
        language:this.single_user_data.language,
        gender:this.single_user_data.gender,
        addLine1:this.single_user_data.address.addLine1,
        addLine2:this.single_user_data.address.addLine2,
        city:this.single_user_data.address.city,
        state:this.single_user_data.address.state,
        zipCode:this.single_user_data.address.zipCode,
        aboutYou:this.single_user_data.aboutYou,
        uploadPhoto:'',
        agreetc:this.single_user_data.agreetc,
        role:this.single_user_data.role
      });
    }, error=>{
      console.log("My error", error)
    })
  }
  updateUser()
  {
    if(this.addEditUserForm.invalid)
    {
      alert('Error!! :-)\n\n' +JSON.stringify(this.addEditUserForm.value));
      return;
    }

    this.user_reg_data = this.addEditUserForm.value;
    this.user_dto ={
    
      age:this.user_reg_data.age,
     
     
      email:this.user_reg_data.email,
      gender:this.user_reg_data.gender,
      address:{
        houseNumber:this.user_reg_data.houseNumber,
        addLine1: this.user_reg_data.addLine1,
        addLine2: this.user_reg_data.addLine2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        zipCode: this.user_reg_data.zipCode,
      },
    
      mobNumber:this.user_reg_data.mobNumber,
      name:this.user_reg_data.name,
      password:this.user_reg_data.password,
     
      roles:this.user_reg_data.role
    }

    this.adminService.editUser(this.edit_user_id,this.user_dto).subscribe(data=>{
      this.addEditUserForm.reset()
      this.getAllUser();
      $('#addEditUserModal').modal('toggle');
     //this.modalElement.nativeElement.style.display = 'toggle';
    },error=>{
      console.log("my wrong ", error);
    })
  }

  deleteUser(user_id:number){
    this.adminService.deleteUser(user_id).subscribe(data=>{
      this.getAllUser();
    }, error =>{
      console.log("My error", error)
    })
  }
  
}
