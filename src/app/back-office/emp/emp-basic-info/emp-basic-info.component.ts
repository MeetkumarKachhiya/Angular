import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { AdminLayoutService } from '../../../layouts/admin-layout/admin-layout.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { StorageService, StorageKey } from '../../../shared/storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-emp-basic-info',
  templateUrl: './emp-basic-info.component.html',
  styleUrls: ['./emp-basic-info.component.css']
})
export class EmpBasicInfoComponent implements OnInit {


  @ViewChild('TABLE', { static: false })
  TABLE!: ElementRef;
  title = 'Excel';
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ScoreSheet.xlsx');
  }



  empApiData: any;

  empListApi = 'http://localhost:6007/v1/adminSide/getEmpInfoList';
  empDataSaveApi = 'http://localhost:6007/v1/adminSide/empInfoSave';
  empDataByIdApi = 'http://localhost:6007/v1/adminSide/basicDetailsById?_id=';
  empDataUpdateApi = 'http://localhost:6007/v1/adminSide/empInfoUpdate';
  file: any;
  imagePath: any;
  imgURL: any;
  message: any;
  myInputVariable: any;

  fileToUpload: any;
  url: any;

  p: number = 1;
  ip: number = 7;

  // empDataDeleteApi = 'http://localhost:6007/v1/adminSide/basicDetailsById?_id=';

  get fNameData() { return this.empBasicInfo.controls; }

  empBasicInfo: any = FormGroup
  index: any;
  _id: any;

  Isedit = false;
  imgUrl = environment.uploadedUrl;
  submitteduserData = false;
  imageTrue = false

  img: any

  term: any;

  constructor(private http: HttpClient, private fb: FormBuilder, public adminLayoutService: AdminLayoutService, public storageService: StorageService, private router: Router, private SpinnerService: NgxSpinnerService) {
    // this.empApiData = this.empApiData.slice();

    if (this.storageService.getValue(StorageKey.IsDiyanLogin) !== 'true') {
      this.router.navigate(['/admin/admin-login']);
    }

  }

  get fuserData(): { [key: string]: AbstractControl } {
    return this.empBasicInfo.controls;
  }

  ngOnInit(): void {
    this.getEmpDataList()
    this.defaultForm()
  }

  defaultForm() {
    this.empBasicInfo = this.fb.group({
      _id: ['0'],
      firstName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      p_Mobile: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      p_Email: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/)]],
      file: ['', [Validators.required]]
    })
  }

  getEmpDataList() {
    // this.http.get(this.empListApi).subscribe((empData: any) => {
    debugger
    this.SpinnerService.show();
    this.adminLayoutService.getuserList().subscribe((empData: any) => {
      debugger
      this.empApiData = empData.data;
      this.SpinnerService.hide();
    })
  }
  sortData(sort: Sort) {
    const data = this.empApiData.slice();
    if (!sort.active || sort.direction === '') {
      this.empApiData = data;
      return;
    }

    this.empApiData = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'firstName':
          return compare(a.firstName, b.firstName, isAsc);
        case 'middleName':
          return compare(a.middleName, b.middleName, isAsc);
        case 'lastName':
          return compare(a.lastName, b.lastName, isAsc);
        case 'p_Email':
          return compare(a.p_Email, b.p_Email, isAsc);
        default:
          return 0;
      }
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

