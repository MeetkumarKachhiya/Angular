import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { EmpBasicInfoComponent } from 'src/app/back-office/emp/emp-basic-info/emp-basic-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSortModule } from '@angular/material/sort';
import { DashboardComponent } from 'src/app/back-office/dashboard/dashboard.component';
import { EmpBasicInfoSaveComponent } from 'src/app/back-office/emp/emp-basic-info-save/emp-basic-info-save.component';
import { MulIMGComponent } from 'src/app/back-office/mul-img/mul-img.component';
import { BlogListComponent } from 'src/app/back-office/blog/blog-list/blog-list.component';
import { AddNewBlogComponent } from 'src/app/back-office/blog/add-new-blog/add-new-blog.component';
import { AddNewNewsComponent } from 'src/app/back-office/news/add-new-news/add-new-news.component';
import { NewsListComponent } from 'src/app/back-office/news/news-list/news-list.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CreateInvoiceComponent } from 'src/app/back-office/company-management/Invoice-Master/create-invoice/create-invoice.component';
import { InvoiceListComponent } from 'src/app/back-office/company-management/Invoice-Master/invoice-list/invoice-list.component';
import { AddArrayInArrayComponent } from 'src/app/back-office/company-management/Invoice-Master/add-array-in-array/add-array-in-array.component';
import { ArrayInArrayListComponent } from 'src/app/back-office/company-management/Invoice-Master/array-in-array-list/array-in-array-list.component';
import { AddArrayInArraySavanComponent } from 'src/app/back-office/company-management/Invoice-Master/add-array-in-array-savan/add-array-in-array-savan.component';
import { AddArrayInArraySavanListComponent } from 'src/app/back-office/company-management/Invoice-Master/add-array-in-array-savan-list/add-array-in-array-savan-list.component';
import { SaveRoleWiseComponent } from 'src/app/back-office/role-master/save-role-wise/save-role-wise.component';
import { ListRoleWiseComponent } from 'src/app/back-office/role-master/list-role-wise/list-role-wise.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {
    NgxMatDateFormats,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    NGX_MAT_DATE_FORMATS
} from '@angular-material-components/datetime-picker';
import { MbscModule } from '@mobiscroll/angular-lite';
import { AddArrayInArrayPackageComponent } from 'src/app/back-office/company-management/Invoice-Master/add-array-in-array-package/add-array-in-array-package.component';
import { AddArrayInArrayPackageListComponent } from 'src/app/back-office/company-management/Invoice-Master/add-array-in-array-package-list/add-array-in-array-package-list.component';
import { MediaMasterSaveComponent } from 'src/app/back-office/mediamaster/mediamaster-save/mediamaster-save.component';
import { MediaMasterListComponent } from 'src/app/back-office/mediamaster/mediamaster-list/mediamaster-list.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

// FullCalendarModule.registerPlugins([
//     // register FullCalendar plugins
//     dayGridPlugin,
//     interactionPlugin
// ]);

const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
    parse: {
        dateInput: "l, LTS"
    },
    display: {
        dateInput: "l, LTS",
        monthYearLabel: "MMM YYYY",
        dateA11yLabel: "LL",
        monthYearA11yLabel: "MMMM YYYY"
    }
};

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        Ng2SearchPipeModule,
        NgxPaginationModule,
        MatSortModule,
        NgxSpinnerModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        NgSelectModule,
        MatCheckboxModule,

        MatDatepickerModule,
        MatInputModule,

        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,

        MbscModule,

        NgxDropzoneModule



        // NgxDaterangepickerMd.forRoot({

        //     displayFormat: 'DD/MM/YYYY'
        // })
    ],
    declarations: [

        EmpBasicInfoComponent,
        DashboardComponent,
        EmpBasicInfoSaveComponent,
        MulIMGComponent,
        BlogListComponent,
        AddNewBlogComponent,
        AddNewNewsComponent,
        NewsListComponent,
        CreateInvoiceComponent,
        InvoiceListComponent,
        AddArrayInArrayComponent,
        ArrayInArrayListComponent,
        AddArrayInArraySavanComponent,
        AddArrayInArraySavanListComponent,
        SaveRoleWiseComponent,
        ListRoleWiseComponent,
        AddArrayInArrayPackageComponent,
        AddArrayInArrayPackageListComponent,
        MediaMasterSaveComponent,
        MediaMasterListComponent
    ],
    exports: [NgxSpinnerModule],
    // bootstrap: [TasksListComponent]
})

export class AdminLayoutModule { }
