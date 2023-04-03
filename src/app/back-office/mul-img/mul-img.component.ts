import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AdminLayoutService } from '../../layouts/admin-layout/admin-layout.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mul-img',
  templateUrl: './mul-img.component.html',
  styleUrls: ['./mul-img.component.css']
})
export class MulIMGComponent implements OnInit {
  myFiles: any = [];
  imgData: any = [];
  ImgData: any = [];

  imgUrl = environment.uploadedUrl;

  constructor(private fb: FormBuilder, public adminLayoutService: AdminLayoutService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.defaultForm()
    // this.getImgList()
  }

  imgForm: any
  urls: any = []

  getImgList() {
    // this.http.get(this.empListApi).subscribe((empData: any) => {
    debugger
    this.adminLayoutService.getImgList().subscribe((empData: any) => {
      debugger
      for (var i = 0; i < empData.data.length; i++) {
        this.imgData = empData.data[i];
        // for (var I = 0; i < this.imgData.profile_image.length; I++) {
        //   // debugger
        //   this.ImgData = this.imgData.profile_image[I];
        // }
      }

    })
  }

  defaultForm() {
    this.imgForm = this.fb.group({
      _id: ['0'],
      profile_image: ['', [Validators.required]]
    })
  }
  mulImgUpload() {
    debugger
    let imgObj: FormData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      imgObj.append("photos", this.myFiles[i]);
    }
    this.adminLayoutService.SaveImgMaster(imgObj).subscribe((empData: any) => {
      debugger
      if (empData.meta.code == 200) {
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




  detectFiles(e: any) {
    this.urls = [];
    let files = e.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
          // debugger
        }
        reader.readAsDataURL(file);
      }
    }
    for (var i = 0; i < e.target.files.length; i++) {

      this.myFiles.push(e.target.files[i]);

    }
  }
}
