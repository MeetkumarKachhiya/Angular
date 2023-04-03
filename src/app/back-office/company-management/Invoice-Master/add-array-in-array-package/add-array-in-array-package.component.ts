import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { AdminLayoutService } from 'src/app/layouts/admin-layout/admin-layout.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { StorageService, StorageKey } from '../../../../shared/storage.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-array-in-array-package',
  templateUrl: './add-array-in-array-package.component.html',
  styleUrls: ['./add-array-in-array-package.component.css']
})
export class AddArrayInArrayPackageComponent implements OnInit {
  packageForm: any;
  empApiData: any;
  empId: any;
  Id: any;

  eIndex: any;
  Isedit: boolean = false
  employeesList: any;
  constructor(private http: HttpClient, private fb: FormBuilder, public adminLayoutService: AdminLayoutService, public storageService: StorageService, private router: Router, private route: ActivatedRoute, private SpinnerService: NgxSpinnerService) {
    // this.empApiData = this.empApiData.slice();

    if (this.storageService.getValue(StorageKey.IsDiyanLogin) !== 'true') {
      this.router.navigate(['/admin/admin-login']);
    }

  }

  get packageData() {
    return this.packageForm.controls;
  }

  submittedPackageData = false;

  ngOnInit(): void {
    const currentUrl = this.router.url
    this.defaultForm();
    // this.employeesList = this.packageForm.get('package') as FormArray;
    // this.getInvoiceDataList();
    if (currentUrl.includes('add-array-in-array-package-list')) {
      this.empId = "0";
      this.Isedit = false;
    } if (currentUrl.includes('edit-array-in-array-package')) {
      // debugger
      this.route.params.subscribe((params: Params) => {
        this.empId = params['id'];
        //this.eIndex = parseInt(params['index']);
      }
      );
      this.Isedit = true;
      this.editPackageData();
    }
  }

  // getInvoiceDataList() {
  //   // this.http.get(this.empListApi).subscribe((empData: any) => {
  //   //debugger
  //   this.SpinnerService.show();
  //   this.adminLayoutService.billMasterList().subscribe((empData: any) => {
  //     //debugger
  //     this.empApiData = empData.data;
  //     this.SpinnerService.hide();
  //   })
  // }

  defaultForm() {
    this.packageForm = this.fb.group({
      packageName: ["", [Validators.required]],
      package: this.fb.array([])
    });
  }

  package(): FormArray {
    return this.packageForm.get('package') as FormArray;
  }

  NewPackage(Obj: any): FormGroup {
    return this.fb.group({
      categoryName: Obj.categoryName,
      categoryDescription: Obj.categoryDescription,
      packageCategoryList: this.fb.array([])
    });
  }

  addPackage(oItem?: any) {
    if (this.packageForm.invalid) {
      this.submittedPackageData = true;
      return;
    }
    let IG = this.fb.group({
      categoryName: [(oItem ? oItem['categoryName'] : ''), [Validators.required]],
      categoryDescription: [(oItem ? oItem['categoryDescription'] : ''), [Validators.required]],
      packageCategoryList: this.fb.array([])
    });
    (this.packageForm.get('package') as FormArray).push(IG);
    let menuIndex = (this.packageForm.get('package') as FormArray).length - 1;
    if (!oItem) {
      this.packageCategory(menuIndex);
    }
    else {
      oItem.packageCategoryList.forEach((cItem: any) => {
        this.packageCategory(menuIndex, cItem);
      });
    }
    // this.package().push(this.newEmployee());
  }

  packageCategory(oItem: number, cItem?: any) {
    // if (this.packageForm.get('package')) {
    //   this.submittedPackageData = true;
    //   return;
    // }
    let cd = this.fb.group({
      description: [(cItem ? cItem['description'] : ''), [Validators.required]],
      item: [(cItem ? cItem['item'] : ''), [Validators.required]],
      quantity: [(cItem ? cItem['quantity'] : ''), [Validators.required]],
    });

    (((this.packageForm.controls['package'] as FormArray)
      .controls[oItem] as FormGroup).controls['packageCategoryList'] as FormArray).push(cd);
  }

  removePackage(packageIndex: number) {
    (this.packageForm.get('package') as FormArray).removeAt(packageIndex);
  }

  employeeSkills(packageIndex: number): FormArray {
    debugger
    return this.package().at(packageIndex).get('packageCategoryList') as FormArray;
  }

  PPackageCategory(OObj: any): FormGroup {
    return this.fb.group({
      description: OObj.description,
      item: OObj.item,
      quantity: OObj.quantity,
    });
  }

  PPPackageCategory(): FormGroup {
    return this.fb.group({
      description: '',
      item: '',
      quantity: ''
    });
  }


  addPackageCategoryList(packageIndex: number) {

    this.PPPackageCategory();

  }


  removePackageCategory(packageIndex: number, packageCategoryIndex: number) {
    ((this.packageForm.get('package') as FormArray).at(packageIndex).get('packageCategoryList') as FormArray).removeAt(packageCategoryIndex);
  }


  onSubmit() {
    debugger
    if (this.packageForm.invalid) {
      this.submittedPackageData = true;
      return;
    }
    console.log(this.packageForm.value);
    let obj = {
      packageName: this.packageForm.value.packageName,
      package: this.packageForm.value.package,
      // packageCategoryList: this.packageForm.value.package[0].packageCategoryList,
    }
    this.adminLayoutService.SavePackageMaster(obj).subscribe((empData: any) => {
      debugger
      if (empData.meta.code == 200) {
        this.submittedPackageData = false;
        console.log(empData)
        this.defaultForm();
        Swal.fire({
          title: 'Sucess Fully Add',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/admin/add-array-in-array-package-list']);
      }
      else {
        Swal.fire({
          title: 'Email All Ready Exit',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        })
        //this.commonService.notifier.notify('error', Response.meta.message);
      }
    })
  }

  editPackageData() {
    debugger
    if (this.empId != "0") {
      let empId = { '_id': this.empId }
      this.Isedit = true;

      this.SpinnerService.show();
      this.adminLayoutService.getPackageByID(empId).subscribe((Response: any) => {
        debugger
        let i = 0
        this.Id = Response.data._id;
        this.packageForm.controls.packageName.setValue(Response.data.packageName)
        // let PackageName = Response.data.packageName
        // this.packageForm.packageName.push(PackageName);
        Response.data.package.forEach((x: any) => {
          let obj = {
            categoryName: x.categoryName,
            categoryDescription: x.categoryDescription,
            packageCategoryList: []
          }
          this.package().push(this.NewPackage(obj));

          x.packageCategoryList.forEach((X: any) => {
            let OObj = {
              description: X.description,
              quantity: X.quantity,
              item: X.item,
            }
            this.employeeSkills(i).push(this.PPackageCategory(OObj));
          });


          i = i + 1;
        });
        this.SpinnerService.hide();
      })
      // debugger
    }
  }

  onUpdate() {
    debugger
    this.SpinnerService.show();
    let obj = {
      _id: this.Id,
      packageName: this.packageForm.value.packageName,
      package: this.packageForm.value.package,
    }
    this.adminLayoutService.UpdatePackageMaster(obj).subscribe((invoiceData: any) => {
      debugger
      if (invoiceData.meta.code == 200) {
        console.log(invoiceData)
        this.defaultForm();
        // this.getInvoiceDataList();
        this.Isedit = false;
        Swal.fire({
          title: 'Sucess Fully Update',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
        this.SpinnerService.hide();
        this.router.navigate(['/admin/add-array-in-array-package-list']);
      }
      else {
        Swal.fire({
          title: 'Fail',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

}

export interface Employee {
  categoryName: string;
  categoryDescription: string;
  packageCategoryList: Skill[];
}

export interface Skill {
  item: string;
  description: string;
  quantity: string
}


