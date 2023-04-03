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
  selector: 'app-add-array-in-array',
  templateUrl: './add-array-in-array.component.html',
  styleUrls: ['./add-array-in-array.component.css']
})
export class AddArrayInArrayComponent implements OnInit {
  empForm: any;
  empApiData: any;
  empId: any;
  Id: any;
  eIndex: any;
  Isedit: boolean = false

  constructor(private http: HttpClient, private fb: FormBuilder, public adminLayoutService: AdminLayoutService, public storageService: StorageService, private router: Router, private route: ActivatedRoute, private SpinnerService: NgxSpinnerService) {
    // this.empApiData = this.empApiData.slice();

    if (this.storageService.getValue(StorageKey.IsDiyanLogin) !== 'true') {
      this.router.navigate(['/admin/admin-login']);
    }

  }

  ngOnInit(): void {
    const currentUrl = this.router.url
    this.defaultForm();
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
    debugger
    this.SpinnerService.show();
    this.adminLayoutService.billMasterList().subscribe((empData: any) => {
      debugger
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

  newEmployee(): FormGroup {
    return this.fb.group({
      firstName: '',
      lastName: '',
      skills: this.fb.array([])
    });

  }

  NewEmployee(Obj: any): FormGroup {
    return this.fb.group({
      firstName: Obj.firstName,
      lastName: Obj.lastName,
      skills: this.fb.array([])
    });
  }

  addEmployee() {
    this.employees().push(this.newEmployee());
  }

  removeEmployee(empIndex: number) {
    this.employees().removeAt(empIndex);
  }

  employeeSkills(empIndex: number): FormArray {
    debugger
    return this.employees().at(empIndex).get('skills') as FormArray;
  }

  newSkill(): FormGroup {
    return this.fb.group({
      skill: '',
      exp: ''
    });
  }

  NewSkill(OObj: any): FormGroup {
    return this.fb.group({
      skill: OObj.skill,
      exp: OObj.exp
    });
  }

  addEmployeeSkill(empIndex: number) {
    this.employeeSkills(empIndex).push(this.newSkill());
  }

  removeEmployeeSkill(empIndex: number, skillIndex: number) {
    this.employeeSkills(empIndex).removeAt(skillIndex);
  }


  onSubmit() {
    debugger
    console.log(this.empForm.value);
    // let empModelObj: FormData = new FormData();
    // this.Isedit = false;
    let obj = {
      employees: this.empForm.value.employees,
      skills: this.empForm.value.skills,
    }
    // this.SpinnerService.show();
    this.adminLayoutService.SaveInvoiceMaster(obj).subscribe((empData: any) => {
      debugger
      if (empData.meta.code == 200) {
        // this.SpinnerService.hide();
        console.log(empData)
        this.defaultForm();
        // this.getInvoiceDataList();
        // this.submitteduserData = false;
        // this.imageTrue = false
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
          this.employees().push(this.NewEmployee(obj));

          x.skills.forEach((X: any) => {
            let OObj = {
              skill: X.skill,
              exp: X.exp,
            }
            this.employeeSkills(i).push(this.NewSkill(OObj));
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


