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
  selector: 'app-add-array-in-array-savan',
  templateUrl: './add-array-in-array-savan.component.html',
  styleUrls: ['./add-array-in-array-savan.component.css']
})
export class AddArrayInArraySavanComponent implements OnInit {
  empForm: any;
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

  ngOnInit(): void {
    const currentUrl = this.router.url
    this.defaultForm();
    // this.employeesList = this.empForm.get('employees') as FormArray;
    this.getInvoiceDataList();
    if (currentUrl.includes('array-in-array-list')) {
      this.empId = "0";
      this.Isedit = false;
    } if (currentUrl.includes('edit-array-in-array')) {
      // debugger
      this.route.params.subscribe((params: Params) => {
        this.empId = params['id'];
        //this.eIndex = parseInt(params['index']);
      }
      );
      this.Isedit = true;
      this.editInvoiceData();
    }
  }

  getInvoiceDataList() {
    // this.http.get(this.empListApi).subscribe((empData: any) => {
    //debugger
    this.SpinnerService.show();
    this.adminLayoutService.billMasterList().subscribe((empData: any) => {
      //debugger
      this.empApiData = empData.data;
      this.SpinnerService.hide();
    })
  }

  defaultForm() {
    this.empForm = this.fb.group({
      employees: this.fb.array([])
    });
  }

  employees(): FormArray {
    return this.empForm.get('employees') as FormArray;
  }

  NewEmployee(Obj: any): FormGroup {
    return this.fb.group({
      firstName: Obj.firstName,
      lastName: Obj.lastName,
      skills: this.fb.array([])
    });
  }

  addEmployee(oItem?: any) {
    let IG = this.fb.group({
      firstName: [(oItem ? oItem['firstName'] : ''),],
      lastName: [(oItem ? oItem['lastName'] : ''),],
      skills: this.fb.array([])
    });
    (this.empForm.get('employees') as FormArray).push(IG);
    let menuIndex = (this.empForm.get('employees') as FormArray).length - 1;
    if (!oItem) {
      this.newSkill(menuIndex);
    } else {
      oItem.skills.forEach((cItem: any) => {
        this.newSkill(menuIndex, cItem);
      });
    }
    // this.employees().push(this.newEmployee());
  }

  newSkill(oItem: number, cItem?: any) {
    let cd = this.fb.group({
      skill: [(cItem ? cItem['skill'] : ''),],
      exp: [(cItem ? cItem['exp'] : ''),],
    });
    (((this.empForm.controls['employees'] as FormArray)
      .controls[oItem] as FormGroup).controls['skills'] as FormArray).push(cd);
  }

  removeEmployee(empIndex: number) {
    (this.empForm.get('employees') as FormArray).removeAt(empIndex);
  }

  employeeSkills(empIndex: number): FormArray {
    debugger
    return this.employees().at(empIndex).get('skills') as FormArray;
  }

  NewSkill(OObj: any): FormGroup {
    return this.fb.group({
      skill: OObj.skill,
      exp: OObj.exp
    });
  }

  NNewSkill(): FormGroup {
    return this.fb.group({
      skill: '',
      exp: ''
    });
  }


  addEmployeeSkill(empIndex: number) {
    this.employeeSkills(empIndex).push(this.NNewSkill());
  }

  removeEmployeeSkill(empIndex: number, skillIndex: number) {
    ((this.empForm.get('employees') as FormArray).at(empIndex).get('skills') as FormArray).removeAt(skillIndex);
  }


  onSubmit() {
    debugger
    console.log(this.empForm.value);
    let obj = {
      employees: this.empForm.value.employees,
      skills: this.empForm.value.skills,
    }
    this.adminLayoutService.SaveInvoiceMaster(obj).subscribe((empData: any) => {
      debugger
      if (empData.meta.code == 200) {
        console.log(empData)
        this.defaultForm();
        Swal.fire({
          title: 'Sucess Fully Add',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/admin/dashboard']);
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

  editInvoiceData() {
    debugger
    if (this.empId != "0") {
      let empId = { '_id': this.empId }
      this.Isedit = true;

      this.SpinnerService.show();
      this.adminLayoutService.getInvoiceByID(empId).subscribe((Response: any) => {
        debugger
        let i = 0
        this.Id = Response.data._id;
        Response.data.employees.forEach((x: any) => {
          let obj = {
            firstName: x.firstName,
            lastName: x.lastName,
            skills: []
          }
          // this.employees().push(this.NewEmployee(obj));

          x.skills.forEach((X: any) => {
            let OObj = {
              skill: X.skill,
              exp: X.exp,
            }
            // this.employeeSkills(i).push(this.NewSkill(OObj));
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
      employees: this.empForm.value.employees,
      skills: this.empForm.value.skills,
    }
    this.adminLayoutService.UpdateInvoiceMaster(obj).subscribe((invoiceData: any) => {
      debugger
      if (invoiceData.meta.code == 200) {
        console.log(invoiceData)
        this.defaultForm();
        this.getInvoiceDataList();
        this.Isedit = false;
        Swal.fire({
          title: 'Sucess Fully Update',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
        this.SpinnerService.hide();
        this.router.navigate(['/admin/array-in-array-list']);
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
  firstName: string;
  lastName: string;
  skills: Skill[];
}

export interface Skill {
  exp: string;
  skill: string;
}


