import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginLayoutService } from 'src/app/layouts/login-layout/login-layout.service';
import { StorageService, StorageKey } from '../../shared/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginForm: any;

  constructor(private http: HttpClient, private fb: FormBuilder, public loginLayoutService: LoginLayoutService, public storageService: StorageService, private router: Router) {

    if (this.storageService.getValue(StorageKey.IsDiyanLogin) == 'true') {
      this.router.navigate(['/admin/dashboard']);
    }

  }

  ngOnInit(): void {
    this.defaultForm();
  }

  loginUserData = false;

  defaultForm(): void {
    this.loginForm = this.fb.group({
      pwd: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/)]],
    })
  }

  login() {
    // debugger
    this.loginUserData = true;
    if (this.loginForm.invalid) {
      return;
    }
    let loginObj = {
      c_Email: this.loginForm.value.email,
      pwd: this.loginForm.value.pwd
    };
    this.loginLayoutService.adminEmployeeLogin(loginObj).subscribe((Response: any) => {
      // debugger
      if (Response.meta.code == 200) {
        localStorage.setItem('LoginUserData', JSON.stringify(Response.data))
        this.storageService.setValue(StorageKey.myToken, Response.data.myToken);
        this.storageService.setValue(StorageKey._id, Response.data._id);
        this.storageService.setValue(StorageKey.employeeId, Response.data.employeeId);
        this.storageService.setValue(StorageKey.firstName, Response.data.firstName);
        this.storageService.setValue(StorageKey.middleName, Response.data.middleName);
        this.storageService.setValue(StorageKey.lastName, Response.data.lastName);
        this.storageService.setValue(StorageKey.email, Response.data.c_Email);
        this.storageService.setValue(StorageKey.p_Email, Response.data.p_Email);
        this.storageService.setValue(StorageKey.profileImage, Response.data.profile_image);
        this.storageService.setValue(StorageKey.accountType, Response.data.accountType);
        this.storageService.setValue(StorageKey.roleType, Response.data.roleName);
        this.storageService.setValue(StorageKey.IsDiyanLogin, 'true');
        this.router.navigate(['/admin/dashboard']);
        // this.commonService.notifier.notify('success', Response.meta.message);
        Swal.fire({
          title: 'Sucess Fully Login',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else if (Response.meta.code === 1007) {
        // this.commonService.notifier.notify('error', Response.meta.message);
        Swal.fire({
          title: 'Invalid Password',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else {
        // this.commonService.notifier.notify('error', Response.meta.message);
        Swal.fire({
          title: 'No User Found',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }, (error) => {
      console.log(error);
    });
  }



}
