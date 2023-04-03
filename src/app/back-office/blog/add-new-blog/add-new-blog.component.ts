import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { AdminLayoutService } from '../../../layouts/admin-layout/admin-layout.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { StorageService, StorageKey } from '../../../shared/storage.service';

@Component({
  selector: 'app-add-new-blog',
  templateUrl: './add-new-blog.component.html',
  styleUrls: ['./add-new-blog.component.css']
})
export class AddNewBlogComponent implements OnInit {


  empApiData: any;

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
  ImgID: any;
  deleteDId: any = [];
  PhotosId: any = [];

  get fNameData() { return this.blogForm.controls; }

  blogForm: any = FormGroup
  index: any;
  _id: any;

  Isedit = false;
  imgUrl = environment.uploadedUrl;
  submitteduserData = false;
  urls: any = []
  img: any
  myFiles: any = []

  term: any;

  constructor(private http: HttpClient, private fb: FormBuilder, public adminLayoutService: AdminLayoutService, public storageService: StorageService, private router: Router, private route: ActivatedRoute) {
    // this.empApiData = this.empApiData.slice();

    if (this.storageService.getValue(StorageKey.IsDiyanLogin) !== 'true') {
      this.router.navigate(['/admin/admin-login']);
    }

  }

  get fuserData(): { [key: string]: AbstractControl } {
    return this.blogForm.controls;
  }

  ngOnInit(): void {
    const currentUrl = this.router.url
    this.getEmpDataList()
    this.defaultForm()
    if (currentUrl.includes('blog-list')) {
      this.empId = "0";
      this.Isedit = false;
    } if (currentUrl.includes('edit-blog-info')) {
      // debugger
      this.route.params.subscribe((params: Params) => {
        this.empId = params['id'];
      }
      );
      this.Isedit = true;
      this.editEmpData()
    }
  }

  defaultForm() {
    this.blogForm = this.fb.group({
      _id: ['0'],
      Title: ['', [Validators.required]],
      Slug: ['', [Validators.required]],
      Metatitle: ['', [Validators.required]],
      MetaDesc: ['', [Validators.required]],
      MetaKeyword: ['', [Validators.required]],

      ShortDesc: ['', [Validators.required]],
      LongDesc: ['', [Validators.required]],

      file: ['', [Validators.required]]
    })
  }

  getEmpDataList() {
    // debugger
    this.adminLayoutService.getuserList().subscribe((empData: any) => {
      // debugger
      this.empApiData = empData.data;
    })
  }

  AddblogData() {
    debugger
    this.submitteduserData = true;
    this.Isedit = false;

    if (this.blogForm.invalid) {
      if (this.blogForm.invalid) {
        return;
      }
    }

    let blogObj: FormData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      blogObj.append("photos", this.myFiles[i]);
    }

    blogObj.append('title', this.blogForm.value.Title)
    blogObj.append('slug', this.blogForm.value.Slug)
    blogObj.append('metaTitle', this.blogForm.value.Metatitle)
    blogObj.append('metaDescription', this.blogForm.value.MetaDesc)
    blogObj.append('metaKeyword', this.blogForm.value.MetaKeyword)
    blogObj.append('shortDescription', this.blogForm.value.ShortDesc)
    blogObj.append('longDescription', this.blogForm.value.LongDesc)

    this.adminLayoutService.SaveblogMaster(blogObj).subscribe((empData: any) => {
      debugger
      if (empData.meta.code == 200) {
        console.log(empData)
        this.defaultForm();
        this.getEmpDataList();
        this.submitteduserData = false;
        Swal.fire({
          title: 'Sucess Fully Add',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/admin/blog-list']);
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

  UpdateEmpData() {

    debugger
    let blogObj: FormData = new FormData();

    if (this.myFiles.length > 0) {
      for (var i = 0; i < this.myFiles.length; i++) {
        blogObj.append("photos", this.myFiles[i]);
      }
    }
    blogObj.append('_id', this.blogForm.value._id)
    blogObj.append('title', this.blogForm.value.Title)
    blogObj.append('slug', this.blogForm.value.Slug)
    blogObj.append('metaTitle', this.blogForm.value.Metatitle)
    blogObj.append('metaDescription', this.blogForm.value.MetaDesc)
    blogObj.append('metaKeyword', this.blogForm.value.MetaKeyword)
    blogObj.append('shortDescription', this.blogForm.value.ShortDesc)
    blogObj.append('longDescription', this.blogForm.value.LongDesc)
    // for (var i = 0; i < this.deleteDId.length; i++) {
    //   blogObj.append("deletedPhotos", this.deleteDId[i].Id + ',');
    //   console.log("%%%%%^^^^^^^^^&&&&&&&&&&&***********", this.deleteDId[i].Id + ',')
    // }
    if (this.deleteDId.length > 0) {
      for (var i = 0; i < this.deleteDId.length; i++) {
        let deletedPhotosId = this.deleteDId[i].Id + ',';
        this.PhotosId.push(deletedPhotosId);
      }
      blogObj.append("deletedPhotos", this.PhotosId);
    }
    // this.http.post(this.empDataUpdateApi, empModelObj).subscribe((empData: any) => {
    this.adminLayoutService.UpdateblogMaster(blogObj).subscribe((empData: any) => {
      debugger
      if (empData.meta.code == 200) {
        console.log(empData)
        this.defaultForm();
        this.getEmpDataList();
        this.Isedit = false;
        Swal.fire({
          title: 'Sucess Fully Update',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/admin/blog-list']);
      }
      else {
        Swal.fire({
          title: 'Fail (field photos not exist)',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  handleFileInput(fs: any) {
    // debugger
    this.fileToUpload = fs.target.files[0];

    if (fs.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(fs.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
    // debugger
  }

  uploadFileToActivity() {
    let empModelObj: FormData = new FormData();
    empModelObj.append('profile_image', this.fileToUpload)
    this.adminLayoutService.SaveImageMaster(empModelObj).subscribe(data => {
      // debugger
    }, error => {
      console.log(error);
    });
  }

  DeletePhoto(paramsObj: any) {
    // DeletePhoto(index: any) {
    debugger
    let i = paramsObj.index
    this.urls.splice(i, 1);
    this.myFiles.splice(i, 1);

    let Ip = {
      Id: (paramsObj.id)
    }
    this.deleteDId.push(Ip);
  }

  editEmpData() {
    if (this.empId != "0") {
      debugger
      let empId = { '_id': this.empId }
      this.Isedit = true;
      this.adminLayoutService.getblogMasterId(empId).subscribe((Response: any) => {
        debugger
        // debugger
        this.blogForm.controls._id.setValue(Response.data._id)
        this.blogForm.controls.Title.setValue(Response.data.title)
        this.blogForm.controls.Slug.setValue(Response.data.slug)
        this.blogForm.controls.Metatitle.setValue(Response.data.metaTitle)
        this.blogForm.controls.MetaDesc.setValue(Response.data.metaDescription)
        this.blogForm.controls.MetaKeyword.setValue(Response.data.metaKeyword)
        this.blogForm.controls.ShortDesc.setValue(Response.data.shortDescription)
        this.blogForm.controls.LongDesc.setValue(Response.data.longDescription)
        this.urls = []
        for (var i = 0; i < Response.data.photosId.length; i++) {
          let ip = {
            imagUrl: this.imgUrl + Response.data.photosId[i].photo_name,
            imagId: Response.data.photosId[i]._id,
          }
          this.urls.push(ip);
        }
        // this.url = this.imgUrl + Response.data.profile_image
      })
      // debugger
    }
  }

  detectFiles(e: any) {
    debugger
    // this.urls = [];
    let files = e.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          let ip = {
            imagUrl: (e.target.result)
          }
          this.urls.push(ip);
          // debugger
        }
        reader.readAsDataURL(file);
      }
    }
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }

    // e.target.files = '';
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}






