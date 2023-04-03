import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FooterComponent } from './footer/footer.component';
// import { NavbarComponent } from './navbar/navbar.component';
// import { LoginnavbarComponent } from './login-navbar/login-navbar.component';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { SidebarComponent } from './sidebar/sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatRippleModule,
        MatFormFieldModule,
        MatTooltipModule,
        MatSelectModule,
        MatCheckboxModule,

        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,

        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
    ],
    declarations: [
        // FooterComponent,
        // NavbarComponent,
        // LoginnavbarComponent,
        SidebarComponent,
        NavbarComponent
    ],
    exports: [
        // FooterComponent,
        // NavbarComponent,
        // LoginnavbarComponent,
        SidebarComponent,
        NavbarComponent

    ]
})
export class ComponentsModule { }
