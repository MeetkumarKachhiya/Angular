import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonService } from './shared/common.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ComponentsModule } from './components/components.module';
// import { ImageDragDirective } from './image-drag.directive';

// import { ClientManagementComponent } from './back-office/client-management/client-management.component';
// import { ProjectManagementComponent } from './back-office/project-management/project-management.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginLayoutComponent,
    // ImageDragDirective,
  ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSortModule,
    ComponentsModule,
    NgxSpinnerModule,
  ],
  providers: [CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
