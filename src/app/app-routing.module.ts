import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MatSortModule } from '@angular/material/sort';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
// import { ClientManagementComponent } from './back-office/client-management/client-management.component';
// import { ProjectManagementComponent } from './back-office/project-management/project-management.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin/admin-login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('../app/layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
    }]
  },

  {
    path: '',
    component: LoginLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('../app/layouts/login-layout/login-layout.module').then(x => x.LoginLayoutModule)
    }]
  }


];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    MatSortModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }