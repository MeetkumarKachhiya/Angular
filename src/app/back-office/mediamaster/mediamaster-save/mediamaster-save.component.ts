import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { AdminLayoutService } from '../../../layouts/admin-layout/admin-layout.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { StorageService, StorageKey } from '../../../shared/storage.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-mediamaster-save',
  templateUrl: './mediamaster-save.component.html',
  styleUrls: ['./mediamaster-save.component.css']
})
export class MediaMasterSaveComponent implements OnInit {


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
  empId: any;

  // empDataDeleteApi = 'http://localhost:6007/v1/adminSide/basicDetailsById?_id=';

  // get fNameData() { return this.empBasicInfo.controls; }

  empBasicInfo: any = FormGroup
  index: any;
  _id: any;

  Isedit = false;
  imgUrl = environment.uploadedUrl;
  submitteduserData = false;
  imageTrue = false

  img: any

  term: any;

  constructor(private http: HttpClient, private fb: FormBuilder, public adminLayoutService: AdminLayoutService, public storageService: StorageService, private router: Router, private route: ActivatedRoute, private SpinnerService: NgxSpinnerService) {
    // this.empApiData = this.empApiData.slice();

    if (this.storageService.getValue(StorageKey.IsDiyanLogin) !== 'true') {
      this.router.navigate(['/admin/admin-login']);
    }

  }

  // get fuserData(): { [key: string]: AbstractControl } {
  //   return this.empBasicInfo.controls;
  // }

  ngOnInit(): void {
    // const currentUrl = this.router.url
    // this.getEmpDataList()
    // this.defaultForm()
    // if (currentUrl.includes('emp-basic-info')) {
    //   this.empId = "0";
    //   this.Isedit = false;
    // } if (currentUrl.includes('edit-emp-basic-info')) {
    //   // debugger
    //   this.route.params.subscribe((params: Params) => {
    //     this.empId = params['id'];
    //   }
    //   );
    //   this.Isedit = true;
    //   this.editEmpData()
    // }
  }

  defaultForm() {
    this.empBasicInfo = this.fb.group({
      _id: ['0'],
      filename: ['', [Validators.required]]
    })
  }

  // getEmpDataList() {
  //   // this.http.get(this.empListApi).subscribe((empData: any) => {
  //   // debugger
  //   this.adminLayoutService.getuserList().subscribe((empData: any) => {
  //     // debugger
  //     this.empApiData = empData.data;
  //   })
  // }

  AddEmpData() {
    // debugger
    this.submitteduserData = true;
    if (this.empBasicInfo.invalid) {
      if (this.empBasicInfo.invalid || !this.empBasicInfo.value.firstName || this.empBasicInfo.value.p_Mobile == null) {
        return;
      }
    }

    this.Isedit = false;
    this.imageTrue = true;

    let empModelObj: FormData = new FormData();
    // empModelObj.append('Id', this.empBasicInfo.value.Id)
    empModelObj.append('profile_image', this.fileToUpload)
    // empModelObj.append('profile_image', this.file)

    // this.http.post(this.empDataSaveApi, empModelObj).subscribe((empData: any) => {
    this.SpinnerService.show();
    this.adminLayoutService.mediaMasterSave(empModelObj).subscribe((empData: any) => {
      // debugger
      if (empData.meta.code == 200) {
        this.SpinnerService.hide();
        console.log(empData)
        // this.defaultForm();
        // this.getEmpDataList();
        this.submitteduserData = false;
        this.imageTrue = false
        Swal.fire({
          title: 'Sucess Fully Add',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/admin/emp-basic-info']);
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
    // this.submittedloginData = false;
  }

  // UpdateEmpData() {

  //   let empModelObj: FormData = new FormData();
  //   empModelObj.append('_id', this.empBasicInfo.value._id)
  //   empModelObj.append('profile_image', this.fileToUpload)
  //   // empModelObj.append('profile_image', this.file)

  //   // this.http.post(this.empDataUpdateApi, empModelObj).subscribe((empData: any) => {
  //   this.SpinnerService.show();
  //   this.adminLayoutService.UpdateUserBasicInfoMaster(empModelObj).subscribe((empData: any) => {
  //     // debugger
  //     if (empData.meta.code == 200) {
  //       console.log(empData)
  //       this.SpinnerService.hide();
  //       this.defaultForm();
  //       this.getEmpDataList();
  //       this.Isedit = false;
  //       this.imageTrue = false;
  //       Swal.fire({
  //         title: 'Sucess Fully Update',
  //         icon: 'success',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //       this.router.navigate(['/admin/emp-basic-info']);
  //     }
  //     else {
  //       Swal.fire({
  //         title: 'Email All Ready Exit',
  //         icon: 'error',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //     }
  //   })
  // }

  // handleFileInput(fs: any) {
  //   // debugger
  //   this.imageTrue = true;
  //   // this.fileToUpload = files.item(0);
  //   this.fileToUpload = fs.target.files[0];

  //   if (fs.target.files) {
  //     var reader = new FileReader();
  //     reader.readAsDataURL(fs.target.files[0]);
  //     reader.onload = (event: any) => {
  //       this.url = event.target.result;
  //     }
  //   }
  //   // debugger
  // }

  // uploadFileToActivity() {
  //   let empModelObj: FormData = new FormData();
  //   empModelObj.append('profile_image', this.fileToUpload)
  //   this.adminLayoutService.SaveImageMaster(empModelObj).subscribe(data => {
  //     // debugger
  //     // this.adminLayoutService.SaveImageMaster(this.fileToUpload).subscribe((empData: any) => {
  //     // do something, if upload success
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  // DeletePhoto() {
  //   this.SpinnerService.show();
  //   this.url = "",
  //     this.fileToUpload = "",
  //     this.imageTrue = false;
  //   this.empBasicInfo.controls.file.setValue('')
  //   this.SpinnerService.hide();
  // }

  // editEmpData() {
  //   if (this.empId != "0") {
  //     let empId = { '_id': this.empId }
  //     this.Isedit = true;
  //     this.imageTrue = true
  //     // this.index = empData.index;
  //     // let empID = {
  //     //   _id: empData.empId
  //     // }
  //     // this.http.get(this.empDataByIdApi + this._id).subscribe((Response: any) => {
  //     this.SpinnerService.show();
  //     this.adminLayoutService.getBasicDetailsByEmployeeID(empId).subscribe((Response: any) => {
  //       // debugger
  //       this.empBasicInfo.controls._id.setValue(Response.data._id)
  //       this.url = this.imgUrl + Response.data.profile_image
  //       this.SpinnerService.hide();
  //     })
  //     // debugger
  //   }
  // }

  files: File[] = [];

  onSelect(event: any) {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", event);
    this.files.push(...event.addedFiles);

    let empModelObj: FormData = new FormData();
    // empModelObj.append('Id', this.empBasicInfo.value.Id)
    for (let i = 0; i < event.addedFiles.length; i++) {
      empModelObj.append('photos', event.addedFiles[i])
    }
    let filename =
      // empModelObj.append('profile_image', this.file)

      // this.http.post(this.empDataSaveApi, empModelObj).subscribe((empData: any) => {
      this.SpinnerService.show();
    this.adminLayoutService.mediaMasterSave(empModelObj).subscribe((empData: any) => {
      // debugger
      if (empData.meta.code == 200) {
        this.SpinnerService.hide();
        console.log(empData)
        // this.defaultForm();
        // this.getEmpDataList();
        this.submitteduserData = false;
        this.imageTrue = false
        Swal.fire({
          title: 'Sucess Fully Add',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/admin/media-list']);
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

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


