import { Component, ViewChild, OnInit, Input, OnChanges } from '@angular/core';
import { StorageService, StorageKey } from '../../../shared/storage.service';
import { AdminLayoutService } from 'src/app/layouts/admin-layout/admin-layout.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BreakpointObserver } from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav';
import { environment } from 'src/environments/environment';



declare const $: any;

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    nav: boolean = false;


    constructor(public adminLayoutService: AdminLayoutService, public storageService: StorageService, private router: Router, private observer: BreakpointObserver) {
        // this.empApiData = this.empApiData.slice();

        if (this.storageService.getValue(StorageKey.IsDiyanLogin) !== 'true') {
            this.router.navigate(['/admin/admin-login']);
        }

    }

    ngOnInit() {

    }

    click() {
        debugger
        this.nav = !this.nav
    }

    logout() {
        debugger
        this.storageService.removeValue(StorageKey.myToken);
        this.storageService.removeValue(StorageKey._id);
        this.storageService.removeValue(StorageKey.firstName);
        this.storageService.removeValue(StorageKey.lastName);
        this.storageService.removeValue(StorageKey.email);
        this.storageService.removeValue(StorageKey.accountType);
        this.storageService.removeValue(StorageKey.roleType);
        this.storageService.removeValue(StorageKey.profileImage);
        this.storageService.removeValue(StorageKey.IsDiyanLogin);
        this.storageService.removeValue(StorageKey.p_Email);
        this.storageService.removeValue(StorageKey.middleName);
        this.storageService.removeValue(StorageKey.employeeId);
        this.storageService.removeValue(StorageKey.LoginUserData);
        this.router.navigate(['/admin/admin-login']);

        Swal.fire({
            title: 'Sucess Fully Logout',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
        })

    }

}
