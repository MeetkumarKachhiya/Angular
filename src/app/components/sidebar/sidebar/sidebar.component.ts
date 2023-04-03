import { Component, ViewChild, OnInit, Input, OnChanges } from '@angular/core';
import { StorageService, StorageKey } from '../../../shared/storage.service';
import { AdminLayoutService } from 'src/app/layouts/admin-layout/admin-layout.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BreakpointObserver } from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  media: any;


  constructor(public adminLayoutService: AdminLayoutService, public storageService: StorageService, private router: Router, private observer: BreakpointObserver) {
    // this.empApiData = this.empApiData.slice();

    if (this.storageService.getValue(StorageKey.IsDiyanLogin) !== 'true') {
      this.router.navigate(['/admin/admin-login']);
    }

  }

  emp: boolean = false;
  news: boolean = false;
  block: boolean = false;
  CompanyManagement: boolean = false;
  role: boolean = false

  dropdown: any
  // classList: any

  imagPath: any;
  firstName: any;
  lastName: any;
  fullName: any;
  imgUrl = environment.uploadedUrl;

  getImageValue() {
    //debugger
    this.imagPath = this.imgUrl + this.storageService.getValue(StorageKey.profileImage);
    this.firstName = this.storageService.getValue(StorageKey.firstName);
    this.lastName = this.storageService.getValue(StorageKey.lastName);
    this.fullName = this.firstName + " " + this.lastName;
  }
  // 


  // var i;

  // Dropdown() {
  //   this.dropdown = document.getElementsByClassName("dropdown-btn");

  //   for (let i = 0; i < this.dropdown.length; i++) {
  //     this.dropdown[i].addEventListener("click", function () {
  //       this.classList.toggle("active");
  //       // // var dropdownContent = this.nextElementSibling;
  //       var dropdownContent = this.nextElementSibling;
  //       if (dropdownContent.style.display === "block") {
  //         dropdownContent.style.display = "none";
  //       } else {
  //         dropdownContent.style.display = "block";
  //       }
  //     });
  //   }
  // }

  ngAfterViewIntit() {
    this.observer.observe(['(max-width:800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'over';
        this.sidenav.open();
      }
    });
  }

  ngOnInit() {
    this.getImageValue();
  }

  empclick() {
    this.emp = !this.emp
  }

  newsclick() {
    this.news = !this.news
  }

  blockclick() {
    this.block = !this.block
  }

  CompanyManagementclick() {
    this.CompanyManagement = !this.CompanyManagement
  }

  roleWiseclick() {
    this.role = !this.role
  }

  mediaClick() {
    this.media = !this.media
  }


  Dashboard() {
    this.router.navigate(['/admin/dashboard']);
  }

  // logout() {
  //   this.storageService.removeValue(StorageKey.myToken);
  //   this.storageService.removeValue(StorageKey._id);
  //   this.storageService.removeValue(StorageKey.firstName);
  //   this.storageService.removeValue(StorageKey.lastName);
  //   this.storageService.removeValue(StorageKey.email);
  //   this.storageService.removeValue(StorageKey.accountType);
  //   this.storageService.removeValue(StorageKey.roleType);
  //   this.storageService.removeValue(StorageKey.profileImage);
  //   this.storageService.removeValue(StorageKey.IsDiyanLogin);
  //   this.storageService.removeValue(StorageKey.p_Email);
  //   this.storageService.removeValue(StorageKey.middleName);
  //   this.storageService.removeValue(StorageKey.employeeId);
  //   this.storageService.removeValue(StorageKey.LoginUserData);
  //   this.router.navigate(['/admin/admin-login']);

  //   Swal.fire({
  //     title: 'Sucess Fully Logout',
  //     icon: 'success',
  //     showConfirmButton: false,
  //     timer: 1500
  //   })

  // }


}
