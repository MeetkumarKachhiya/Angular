import { Routes } from '@angular/router';
import { AddNewBlogComponent } from 'src/app/back-office/blog/add-new-blog/add-new-blog.component';
import { AddNewNewsComponent } from 'src/app/back-office/news/add-new-news/add-new-news.component';
import { BlogListComponent } from 'src/app/back-office/blog/blog-list/blog-list.component';
import { DashboardComponent } from 'src/app/back-office/dashboard/dashboard.component';
import { EmpBasicInfoSaveComponent } from 'src/app/back-office/emp/emp-basic-info-save/emp-basic-info-save.component';
import { EmpBasicInfoComponent } from 'src/app/back-office/emp/emp-basic-info/emp-basic-info.component';
import { MulIMGComponent } from 'src/app/back-office/mul-img/mul-img.component';
import { NewsListComponent } from 'src/app/back-office/news/news-list/news-list.component';
import { CreateInvoiceComponent } from 'src/app/back-office/company-management/Invoice-Master/create-invoice/create-invoice.component';
import { InvoiceListComponent } from 'src/app/back-office/company-management/Invoice-Master/invoice-list/invoice-list.component';
import { AddArrayInArrayComponent } from 'src/app/back-office/company-management/Invoice-Master/add-array-in-array/add-array-in-array.component';
import { ArrayInArrayListComponent } from 'src/app/back-office/company-management/Invoice-Master/array-in-array-list/array-in-array-list.component';
import { AddArrayInArraySavanComponent } from 'src/app/back-office/company-management/Invoice-Master/add-array-in-array-savan/add-array-in-array-savan.component';
import { AddArrayInArraySavanListComponent } from 'src/app/back-office/company-management/Invoice-Master/add-array-in-array-savan-list/add-array-in-array-savan-list.component';
import { SaveRoleWiseComponent } from 'src/app/back-office/role-master/save-role-wise/save-role-wise.component';
import { ListRoleWiseComponent } from 'src/app/back-office/role-master/list-role-wise/list-role-wise.component';
import { AddArrayInArrayPackageComponent } from 'src/app/back-office/company-management/Invoice-Master/add-array-in-array-package/add-array-in-array-package.component';
import { AddArrayInArrayPackageListComponent } from 'src/app/back-office/company-management/Invoice-Master/add-array-in-array-package-list/add-array-in-array-package-list.component';
// import { AddNewMediaComponent } from 'src/app/back-office/mediamaster/add-new-mediamaster/add-new-mediamaster.component';
import { MediaMasterListComponent } from 'src/app/back-office/mediamaster/mediamaster-list/mediamaster-list.component';
import { MediaMasterSaveComponent } from 'src/app/back-office/mediamaster/mediamaster-save/mediamaster-save.component';

export const AdminLayoutRoutes: Routes = [

    { path: 'admin/emp-basic-info', component: EmpBasicInfoComponent },
    { path: 'admin/dashboard', component: DashboardComponent },
    { path: 'admin/emp-basic-info-save', component: EmpBasicInfoSaveComponent },
    { path: 'admin/edit-emp-basic-info/:id', component: EmpBasicInfoSaveComponent },
    { path: 'admin/mul-img', component: MulIMGComponent },
    { path: 'admin/blog-list', component: BlogListComponent },
    { path: 'admin/add-new-blog', component: AddNewBlogComponent },
    { path: 'admin/edit-blog-info/:id', component: AddNewBlogComponent },
    { path: 'admin/add-new-news', component: AddNewNewsComponent },
    { path: 'admin/edit-news-info/:id', component: AddNewNewsComponent },
    { path: 'admin/news-list', component: NewsListComponent },
    { path: 'admin/create-invoice', component: CreateInvoiceComponent },
    { path: 'admin/invoice-list', component: InvoiceListComponent },
    { path: 'admin/edit-invoice/:id', component: CreateInvoiceComponent },

    { path: 'admin/add-array-in-array', component: AddArrayInArrayComponent },
    { path: 'admin/array-in-array-list', component: ArrayInArrayListComponent },
    { path: 'admin/edit-array-in-array/:id/:index', component: AddArrayInArrayComponent },

    { path: 'admin/add-array-in-array-savan', component: AddArrayInArraySavanComponent },
    { path: 'admin/add-array-in-array-savan-list', component: AddArrayInArraySavanListComponent },
    { path: 'admin/edit-array-in-array-savan/:id/:index', component: AddArrayInArraySavanComponent },

    { path: 'admin/add-array-in-array-package', component: AddArrayInArrayPackageComponent },
    { path: 'admin/add-array-in-array-package-list', component: AddArrayInArrayPackageListComponent },
    { path: 'admin/edit-array-in-array-package/:id/:index', component: AddArrayInArrayPackageComponent },

    { path: 'admin/save-role-wise', component: SaveRoleWiseComponent },
    { path: 'admin/list-role-wise', component: ListRoleWiseComponent },
    { path: 'admin/save-role-wise/:id/:index', component: SaveRoleWiseComponent },

    { path: 'admin/add-new-media', component: MediaMasterSaveComponent },
    { path: 'admin/edit-media-info/:id', component: MediaMasterSaveComponent },
    { path: 'admin/media-list', component: MediaMasterListComponent },

];
