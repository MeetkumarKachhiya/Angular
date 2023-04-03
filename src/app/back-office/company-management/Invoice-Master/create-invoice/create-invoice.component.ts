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
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {
  empId: any;
  Isedit = false;
  invoiceData: any;
  Id: any;

  constructor(private http: HttpClient, private fb: FormBuilder, public adminLayoutService: AdminLayoutService, public storageService: StorageService, private router: Router, private route: ActivatedRoute, private SpinnerService: NgxSpinnerService) {
    // this.empApiData = this.empApiData.slice();

    if (this.storageService.getValue(StorageKey.IsDiyanLogin) !== 'true') {
      this.router.navigate(['/admin/admin-login']);
    }

  }

  invoiceGenerateForm: any;

  get billItem(): FormArray {
    return this.invoiceGenerateForm.get("billItem") as FormArray
  }

  ngOnInit(): void {
    const currentUrl = this.router.url
    this.defaultForm();
    this.getInvoiceDataList();
    if (currentUrl.includes('invoice-list')) {
      this.empId = "0";
      this.Isedit = false;
    } if (currentUrl.includes('edit-invoice')) {
      // debugger
      this.route.params.subscribe((params: Params) => {
        this.empId = params['id'];
      }
      );
      this.Isedit = true;
      this.editInvoiceData();
    }
  }

  defaultForm() {
    this.invoiceGenerateForm = this.fb.group({
      billDate: '',
      billItem: this.fb.array([]),
    });
  }

  getInvoiceDataList() {
    // this.http.get(this.empListApi).subscribe((empData: any) => {
    debugger
    this.SpinnerService.show();
    this.adminLayoutService.billMasterList().subscribe((empData: any) => {
      debugger
      this.invoiceData = empData.data;
      this.SpinnerService.hide();
    })
  }

  newSkill(): FormGroup {
    return this.fb.group({
      itemName: '',
      amount: '',
    })
  }

  newItem(Obj: any): FormGroup {
    return this.fb.group({
      itemName: Obj.itemName,
      amount: Obj.amount,
    })
  }

  addBillItem() {
    this.billItem.push(this.newSkill());
  }

  removeBillItem(i: number) {
    this.billItem.removeAt(i);
  }

  onSubmit() {
    console.log(this.invoiceGenerateForm.value);
    // let empModelObj: FormData = new FormData();
    this.Isedit = false;
    let obj = {
      billDate: this.invoiceGenerateForm.value.billDate,
      billItem: this.invoiceGenerateForm.value.billItem,
    }
    this.SpinnerService.show();
    this.adminLayoutService.SaveInvoiceMaster(obj).subscribe((empData: any) => {
      debugger
      if (empData.meta.code == 200) {
        this.SpinnerService.hide();
        console.log(empData)
        this.defaultForm();
        this.getInvoiceDataList();
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
        this.Id = Response.data._id;
        this.invoiceGenerateForm.controls.billDate.setValue(Response.data.billDate);
        Response.data.billItem.forEach((x: any) => {
          let obj = {
            itemName: x.itemName,
            amount: x.amount,
          }
          this.billItem.push(this.newItem(obj));
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
      billDate: this.invoiceGenerateForm.value.billDate,
      billItem: this.invoiceGenerateForm.value.billItem,
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
        this.router.navigate(['/admin/invoice-list']);
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

// export class country {
//   id: string;
//   name: string;

//   constructor(id: string, name: string) {
//     this.id = id;
//     this.name = name;
//   }
// }
