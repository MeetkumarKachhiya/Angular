import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { AdminLayoutService } from '../../../layouts/admin-layout/admin-layout.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { StorageService, StorageKey } from '../../../shared/storage.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-role-wise',
  templateUrl: './list-role-wise.component.html',
  styleUrls: ['./list-role-wise.component.css']
})
export class ListRoleWiseComponent implements OnInit {
  empApiData: any;
  selectedRole: any;
  activeroleList: any;
  rolewisemenuForm: any;
  menuList: any;
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
    this.getRoleActiveList();
    this.selectedRole = null;
    this.defaultForm();
    this.menuList = this.rolewisemenuForm.get('menuList') as FormArray;
    // let DB = this.fb.group({
    //   ISCreated: false,
    // });
  }

  defaultForm() {
    this.rolewisemenuForm = this.fb.group({
      menuList: this.fb.array([]),
    });
  }

  getRoleActiveList() {
    // this.http.get(this.empListApi).subscribe((empData: any) => {
    debugger
    this.adminLayoutService.getRoleList().subscribe((Response: any) => {
      debugger
      if (Response.meta.code == 200) {
        this.activeroleList = Response.data;
      } else {
      }
    })
  }

  onRoleChange() {
    debugger
    this.menuList.clear();
    let roleId = { RoleId: this.selectedRole }
    this.adminLayoutService.getRolewisemenuList(roleId).subscribe((Response: any) => {
      debugger
      if (Response.meta.code == 200) {
        for (let I = 0; I < Response.data.length; I++) {
          // Response.data.forEach((oItem: any) => {
          debugger
          this.addMenuItem(Response.data[I]);
          let L = Response.data[I].childrenData.length
          console.log("###########################", Response.data[I])
          if (Response.data[I].childrenData.length > 0) {
            for (let i = 0; i < L; i++) {
              if (this.rolewisemenuForm.controls['menuList'].controls[I].controls['childrenData'].controls[i].get('isCreated').value == true && this.rolewisemenuForm.controls['menuList'].controls[I].controls['childrenData'].controls[i].get('isUpdated').value == true && this.rolewisemenuForm.controls['menuList'].controls[I].controls['childrenData'].controls[i].get('isView').value == true && this.rolewisemenuForm.controls['menuList'].controls[I].controls['childrenData'].controls[i].get('isDeleted').value == true) {
                this.rolewisemenuForm.controls['menuList'].controls[I].controls['childrenData'].controls[i].get('ISCreated').setValue(true);
              }
            }
          }

          for (let i = 0; i < L; i++) {
            if (this.rolewisemenuForm.controls['menuList'].controls[I].controls['childrenData'].controls[i].get('ISCreated').value == true) {
              this.rolewisemenuForm.get('menuList')
                .controls[I].get('IsCreated').setValue(true) as FormArray;
            }
            else {
              this.rolewisemenuForm.get('menuList')
                .controls[I].get('IsCreated').setValue(false) as FormArray;
              break;
            }
          }
        }
      } else {
      }
    }, (error) => {
      console.log(error.error.Message);
    });
  }

  addMenuItem(oItem?: any) {

    debugger
    let IG = this.fb.group({
      menuId: [(oItem['_id'] ? oItem['_id'] : ''),],
      title: [(oItem['title'] ? oItem['title'] : ''),],
      isCreated: [(oItem['isCreated'] ? oItem['isCreated'] : false),],
      IsCreated: [(oItem['IsCreated'] ? oItem['IsCreated'] : false),],
      // ISCreated: [(oItem['ISCreated'] ? oItem['ISCreated'] : false),],
      isUpdated: [(oItem['isUpdated'] ? oItem['isUpdated'] : false),],
      isView: [(oItem['isView'] ? oItem['isView'] : false),],
      isDeleted: [(oItem['isDeleted'] ? oItem['isDeleted'] : false),],
      isShowChildrenList: [(oItem['isShowChildrenList'] ? oItem['isShowChildrenList'] : false),],
      childrenData: this.fb.array([]),
    });
    (<FormArray>this.rolewisemenuForm.get('menuList')).push(IG);
    let menuIndex = (<FormArray>this.rolewisemenuForm.get('menuList')).length - 1;
    console.log("@@@@@@@###########$$$$$$$$$$$$$$$$$$$$", (<FormArray>this.rolewisemenuForm.get('menuList')).length)
    oItem.childrenData.forEach((cItem: any) => {
      this.addChildrenItem(menuIndex, cItem);
    });
  }

  addChildrenItem(oItem: number, cItem?: any) {
    let cd = this.fb.group({
      menuId: [(cItem['_id'] ? cItem['_id'] : ''),],
      title: [(cItem['title'] ? cItem['title'] : ''),],
      ISCreated: [(cItem['ISCreated'] ? cItem['ISCreated'] : false),],
      isCreated: [(cItem['isCreated'] ? cItem['isCreated'] : false),],
      isUpdated: [(cItem['isUpdated'] ? cItem['isUpdated'] : false),],
      isView: [(cItem['isView'] ? cItem['isView'] : false),],
      isDeleted: [(cItem['isDeleted'] ? cItem['isDeleted'] : false),],
    });
    (<FormArray>(<FormGroup>(<FormArray>this.rolewisemenuForm.controls['menuList'])
      .controls[oItem]).controls['childrenData']).push(cd);
  }

  isCreatedAllchildrenData(paramsObj: any) {
    debugger

    let menuIndex = paramsObj.index
    let checked = paramsObj.checked

    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@########", this.rolewisemenuForm.get('menuList')
      .controls[menuIndex].get('isCreated').value)

    if (checked == true) {
      this.rolewisemenuForm.controls['menuList']
        .controls[menuIndex].controls['childrenData'].controls.map((value: { get: (arg0: string) => { (): any; new(): any; setValue: { (arg0: boolean): any; new(): any; }; }; }) => value.get('isCreated').setValue(true)) as FormArray;;
      if (this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('isCreated').value == true) {
        debugger
        if (this.rolewisemenuForm.get('menuList')
          .controls[menuIndex].get('isUpdated').value == true) {
          if (this.rolewisemenuForm.get('menuList')
            .controls[menuIndex].get('isView').value == true) {
            if (this.rolewisemenuForm.get('menuList')
              .controls[menuIndex].get('isDeleted').value == true) {
              this.rolewisemenuForm.get('menuList')
                .controls[menuIndex].get('IsCreated').setValue(true) as FormArray;
            }
          }
        }
      }
    } else {
      this.rolewisemenuForm.controls['menuList']
        .controls[menuIndex].controls['childrenData'].controls.map((value: { get: (arg0: string) => { (): any; new(): any; setValue: { (arg0: boolean): any; new(): any; }; }; }) => value.get('isCreated').setValue(false)) as FormArray;
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('IsCreated').setValue(false) as FormArray;
    }

    let L = this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].length
    console.log("@@@@@@@@@@@@@@@@@@", L)


    for (let i = 0; i < L; i++) {
      if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isCreated').value == true && this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isUpdated').value == true && this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isView').value == true && this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isDeleted').value == true) {
        this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('ISCreated').setValue(true);
      }
    }

    for (let i = 0; i < L; i++) {
      if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isCreated').value == false || this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isUpdated').value == false || this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isView').value == false || this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isDeleted').value == false) {
        this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('ISCreated').setValue(false);
      }
    }
  }

  showHideMenuList(params: any) {

    if (params !== undefined && params.index !== undefined) {
      if ((<FormArray>this.rolewisemenuForm.get('menuList')).controls[params.index].value.isShowChildrenList == false) {
        this.rolewisemenuForm.get('menuList').controls[params.index].get('isShowChildrenList').setValue(true) as FormArray;
      } else {
        this.rolewisemenuForm.get('menuList').controls[params.index].get('isShowChildrenList').setValue(false) as FormArray;
      }

    }
  }

  isUpdatedchildrenData(paramsObj: any) {

    let menuIndex = paramsObj.index
    let checked = paramsObj.checked

    if (checked == true) {
      this.rolewisemenuForm.controls['menuList']
        .controls[menuIndex].controls['childrenData'].controls.map((value: { get: (arg0: string) => { (): any; new(): any; setValue: { (arg0: boolean): any; new(): any; }; }; }) => value.get('isUpdated').setValue(true)) as FormArray;
      if (this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('isCreated').value == true) {
        debugger
        if (this.rolewisemenuForm.get('menuList')
          .controls[menuIndex].get('isUpdated').value == true) {
          if (this.rolewisemenuForm.get('menuList')
            .controls[menuIndex].get('isView').value == true) {
            if (this.rolewisemenuForm.get('menuList')
              .controls[menuIndex].get('isDeleted').value == true) {
              this.rolewisemenuForm.get('menuList')
                .controls[menuIndex].get('IsCreated').setValue(true) as FormArray;
            }
          }
        }
      }
    } else {
      this.rolewisemenuForm.controls['menuList']
        .controls[menuIndex].controls['childrenData'].controls.map((value: { get: (arg0: string) => { (): any; new(): any; setValue: { (arg0: boolean): any; new(): any; }; }; }) => value.get('isUpdated').setValue(false)) as FormArray;
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('IsCreated').setValue(false) as FormArray;
    }


    let L = this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].length
    console.log("@@@@@@@@@@@@@@@@@@", L)

    for (let i = 0; i < L; i++) {
      if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isCreated').value == true && this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isUpdated').value == true && this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isView').value == true && this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isDeleted').value == true) {
        this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('ISCreated').setValue(true);
      }
    }

    for (let i = 0; i < L; i++) {
      if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isCreated').value == false || this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isUpdated').value == false || this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isView').value == false || this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isDeleted').value == false) {
        this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('ISCreated').setValue(false);
      }
    }
  }

  isDeletedchildrenData(paramsObj: any) {
    let menuIndex = paramsObj.index
    let checked = paramsObj.checked

    if (checked == true) {
      this.rolewisemenuForm.controls['menuList']
        .controls[menuIndex].controls['childrenData'].controls.map((value: { get: (arg0: string) => { (): any; new(): any; setValue: { (arg0: boolean): any; new(): any; }; }; }) => value.get('isDeleted').setValue(true)) as FormArray;
      if (this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('isCreated').value == true) {
        debugger
        if (this.rolewisemenuForm.get('menuList')
          .controls[menuIndex].get('isUpdated').value == true) {
          if (this.rolewisemenuForm.get('menuList')
            .controls[menuIndex].get('isView').value == true) {
            if (this.rolewisemenuForm.get('menuList')
              .controls[menuIndex].get('isDeleted').value == true) {
              this.rolewisemenuForm.get('menuList')
                .controls[menuIndex].get('IsCreated').setValue(true) as FormArray;
            }
          }
        }
      }
    } else {
      this.rolewisemenuForm.controls['menuList']
        .controls[menuIndex].controls['childrenData'].controls.map((value: { get: (arg0: string) => { (): any; new(): any; setValue: { (arg0: boolean): any; new(): any; }; }; }) => value.get('isDeleted').setValue(false)) as FormArray;
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('IsCreated').setValue(false) as FormArray;
    }


    let L = this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].length
    console.log("@@@@@@@@@@@@@@@@@@", L)

    for (let i = 0; i < L; i++) {
      if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isCreated').value == true && this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isUpdated').value == true && this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isView').value == true && this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isDeleted').value == true) {
        this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('ISCreated').setValue(true);
      }
    }

    for (let i = 0; i < L; i++) {
      if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isCreated').value == false || this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isUpdated').value == false || this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isView').value == false || this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isDeleted').value == false) {
        this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('ISCreated').setValue(false);
      }
    }


    // if (this.rolewisemenuForm.get('menuList')
    //   .controls[menuIndex].get('isCreated').value == true && this.rolewisemenuForm.get('menuList')
    //     .controls[menuIndex].get('isView').value == true && this.rolewisemenuForm.get('menuList')
    //       .controls[menuIndex].get('isUpdated').value == true && this.rolewisemenuForm.get('menuList')
    //         .controls[menuIndex].get('isDeleted').value == true) {
    //   for (let i = 0; i < L; i++) {
    //     this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('ISCreated').setValue(true);
    //   }
    // }

    // if (this.rolewisemenuForm.get('menuList')
    //   .controls[menuIndex].get('isCreated').value == false || this.rolewisemenuForm.get('menuList')
    //     .controls[menuIndex].get('isView').value == false || this.rolewisemenuForm.get('menuList')
    //       .controls[menuIndex].get('isUpdated').value == false || this.rolewisemenuForm.get('menuList')
    //         .controls[menuIndex].get('isDeleted').value == false) {
    //   for (let i = 0; i < L; i++) {
    //     this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('ISCreated').setValue(false);
    //   }
    // }
  }

  isViewAllchildrenData(paramsObj: any) {

    let menuIndex = paramsObj.index
    let checked = paramsObj.checked

    if (checked == true) {
      this.rolewisemenuForm.controls['menuList']
        .controls[menuIndex].controls['childrenData'].controls.map((value: { get: (arg0: string) => { (): any; new(): any; setValue: { (arg0: boolean): any; new(): any; }; }; }) => value.get('isView').setValue(true)) as FormArray;
      if (this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('isCreated').value == true) {
        debugger
        if (this.rolewisemenuForm.get('menuList')
          .controls[menuIndex].get('isUpdated').value == true) {
          if (this.rolewisemenuForm.get('menuList')
            .controls[menuIndex].get('isView').value == true) {
            if (this.rolewisemenuForm.get('menuList')
              .controls[menuIndex].get('isDeleted').value == true) {
              this.rolewisemenuForm.get('menuList')
                .controls[menuIndex].get('IsCreated').setValue(true) as FormArray;
            }
          }
        }
      }
    } else {
      this.rolewisemenuForm.controls['menuList']
        .controls[menuIndex].controls['childrenData'].controls.map((value: { get: (arg0: string) => { (): any; new(): any; setValue: { (arg0: boolean): any; new(): any; }; }; }) => value.get('isView').setValue(false)) as FormArray;
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('IsCreated').setValue(false) as FormArray;
    }


    let L = this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].length
    console.log("@@@@@@@@@@@@@@@@@@", L)

    for (let i = 0; i < L; i++) {
      if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isCreated').value == true && this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isUpdated').value == true && this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isView').value == true && this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isDeleted').value == true) {
        this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('ISCreated').setValue(true);
      }
    }

    for (let i = 0; i < L; i++) {
      if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isCreated').value == false || this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isUpdated').value == false || this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isView').value == false || this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isDeleted').value == false) {
        this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('ISCreated').setValue(false);
      }
    }
  }

  isCreatedmenuData(paramsObj: any) {

    let menuIndex = paramsObj.menuIndex;
    let innerI = paramsObj.innerI;
    let checked = paramsObj.checked;

    var totalSelected = 0;
    (<FormArray>(<FormGroup>(<FormArray>this.rolewisemenuForm.controls['menuList'])
      .controls[menuIndex]).controls['childrenData']).controls.forEach(value => {

        if (value.value.isCreated == true) {
          totalSelected++;
        }

      });
    if (totalSelected > 0) {
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('isCreated').setValue(true) as FormArray;
    } else {
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('isCreated').setValue(false) as FormArray;
    }

    if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isCreated').value == true && this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isView').value == true && this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isUpdated').value == true && this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isDeleted').value == true) {

      this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('ISCreated').setValue(true) as FormArray;

    }

    if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isCreated').value == false || this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isView').value == false || this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isUpdated').value == false || this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isDeleted').value == false) {

      this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('ISCreated').setValue(false) as FormArray;

    }

    let L = this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].length
    console.log("@@@@@@@@@@@@@@@@@@", L)


    if (checked == true) {
      for (let i = 0; i < L; i++) {
        if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('ISCreated').value == true) {
          this.rolewisemenuForm.get('menuList')
            .controls[menuIndex].get('IsCreated').setValue(true) as FormArray;
        }
        else {
          this.rolewisemenuForm.get('menuList')
            .controls[menuIndex].get('IsCreated').setValue(false) as FormArray;
          break;
        }
      }
    }

    if (checked == false) {
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('IsCreated').setValue(false) as FormArray;
    }

  }

  isUpdatedmenuData(paramsObj: any) {
    let menuIndex = paramsObj.menuIndex
    var totalSelected = 0;
    let innerI = paramsObj.innerI;
    let checked = paramsObj.checked;
    (<FormArray>(<FormGroup>(<FormArray>this.rolewisemenuForm.controls['menuList'])
      .controls[menuIndex]).controls['childrenData']).controls.forEach(value => {

        if (value.value.isUpdated == true) {
          totalSelected++;
        }

      });
    if (totalSelected > 0) {
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('isUpdated').setValue(true) as FormArray;
    } else {
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('isUpdated').setValue(false) as FormArray;
    }

    if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isCreated').value == true && this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isView').value == true && this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isUpdated').value == true && this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isDeleted').value == true) {

      this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('ISCreated').setValue(true) as FormArray;

    }

    if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isCreated').value == false || this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isView').value == false || this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isUpdated').value == false || this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isDeleted').value == false) {

      this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('ISCreated').setValue(false) as FormArray;

    }

    let L = this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].length
    console.log("@@@@@@@@@@@@@@@@@@", L)


    if (checked == true) {
      for (let i = 0; i < L; i++) {
        if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('ISCreated').value == true) {
          this.rolewisemenuForm.get('menuList')
            .controls[menuIndex].get('IsCreated').setValue(true) as FormArray;
        }
        else {
          this.rolewisemenuForm.get('menuList')
            .controls[menuIndex].get('IsCreated').setValue(false) as FormArray;
          break;
        }
      }
    }

    if (checked == false) {
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('IsCreated').setValue(false) as FormArray;
    }

  }

  isViewmenuData(paramsObj: any) {
    let menuIndex = paramsObj.menuIndex
    var totalSelected = 0;
    let innerI = paramsObj.innerI;
    let checked = paramsObj.checked;
    (<FormArray>(<FormGroup>(<FormArray>this.rolewisemenuForm.controls['menuList'])
      .controls[menuIndex]).controls['childrenData']).controls.forEach(value => {
        if (value.value.isView == true) {
          totalSelected++;
        }
      });
    if (totalSelected > 0) {
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('isView').setValue(true) as FormArray;
    } else {
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('isView').setValue(false) as FormArray;
    }

    if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isCreated').value == true && this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isView').value == true && this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isUpdated').value == true && this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isDeleted').value == true) {

      this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('ISCreated').setValue(true) as FormArray;

    }

    if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isCreated').value == false || this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isView').value == false || this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isUpdated').value == false || this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isDeleted').value == false) {

      this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('ISCreated').setValue(false) as FormArray;

    }

    let L = this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].length
    console.log("@@@@@@@@@@@@@@@@@@", L)


    if (checked == true) {
      for (let i = 0; i < L; i++) {
        if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('ISCreated').value == true) {
          this.rolewisemenuForm.get('menuList')
            .controls[menuIndex].get('IsCreated').setValue(true) as FormArray;
        }
        else {
          this.rolewisemenuForm.get('menuList')
            .controls[menuIndex].get('IsCreated').setValue(false) as FormArray;
          break;
        }
      }
    }

    if (checked == false) {
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('IsCreated').setValue(false) as FormArray;
    }

  }

  isDeletedmenuData(paramsObj: any) {
    let menuIndex = paramsObj.menuIndex
    var totalSelected = 0;
    let innerI = paramsObj.innerI;
    let checked = paramsObj.checked;
    (<FormArray>(<FormGroup>(<FormArray>this.rolewisemenuForm.controls['menuList'])
      .controls[menuIndex]).controls['childrenData']).controls.forEach(value => {

        if (value.value.isDeleted == true) {
          totalSelected++;
        }

      });
    if (totalSelected > 0) {
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('isDeleted').setValue(true) as FormArray;
    } else {
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('isDeleted').setValue(false) as FormArray;
    }

    if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isCreated').value == true && this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isView').value == true && this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isUpdated').value == true && this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isDeleted').value == true) {

      this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('ISCreated').setValue(true) as FormArray;

    }

    if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isCreated').value == false || this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isView').value == false || this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isUpdated').value == false || this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isDeleted').value == false) {

      this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('ISCreated').setValue(false) as FormArray;

    }

    let L = this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].length
    console.log("@@@@@@@@@@@@@@@@@@", L)

    if (checked == true) {
      for (let i = 0; i < L; i++) {
        if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('ISCreated').value == true) {
          this.rolewisemenuForm.get('menuList')
            .controls[menuIndex].get('IsCreated').setValue(true) as FormArray;
        }
        else {
          this.rolewisemenuForm.get('menuList')
            .controls[menuIndex].get('IsCreated').setValue(false) as FormArray;
          break;
        }
      }
    }

    if (checked == false) {
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('IsCreated').setValue(false) as FormArray;
    }

  }

  isCreatedMenuData(paramsObj: any) {

    let menuIndex = paramsObj.index
    let checked = paramsObj.checked
    var totalSelected = 0;

    if (checked == true) {
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('IsCreated').setValue(true) as FormArray;
    } else {
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('IsCreated').setValue(false) as FormArray;
    }

    if (checked == true) {
      this.rolewisemenuForm.controls['menuList']
        .controls[menuIndex].controls['childrenData'].controls.map((value: { get: (arg0: string) => { (): any; new(): any; setValue: { (arg0: boolean): any; new(): any; }; }; }) => value.get('isCreated').setValue(true)) as FormArray;;
    } else {
      this.rolewisemenuForm.controls['menuList']
        .controls[menuIndex].controls['childrenData'].controls.map((value: { get: (arg0: string) => { (): any; new(): any; setValue: { (arg0: boolean): any; new(): any; }; }; }) => value.get('isCreated').setValue(false)) as FormArray;
    }

    if (checked == true) {
      this.rolewisemenuForm.controls['menuList']
        .controls[menuIndex].controls['childrenData'].controls.map((value: { get: (arg0: string) => { (): any; new(): any; setValue: { (arg0: boolean): any; new(): any; }; }; }) => value.get('isUpdated').setValue(true)) as FormArray;
    } else {
      this.rolewisemenuForm.controls['menuList']
        .controls[menuIndex].controls['childrenData'].controls.map((value: { get: (arg0: string) => { (): any; new(): any; setValue: { (arg0: boolean): any; new(): any; }; }; }) => value.get('isUpdated').setValue(false)) as FormArray;
    }

    if (checked == true) {
      this.rolewisemenuForm.controls['menuList']
        .controls[menuIndex].controls['childrenData'].controls.map((value: { get: (arg0: string) => { (): any; new(): any; setValue: { (arg0: boolean): any; new(): any; }; }; }) => value.get('isDeleted').setValue(true)) as FormArray;
    } else {
      this.rolewisemenuForm.controls['menuList']
        .controls[menuIndex].controls['childrenData'].controls.map((value: { get: (arg0: string) => { (): any; new(): any; setValue: { (arg0: boolean): any; new(): any; }; }; }) => value.get('isDeleted').setValue(false)) as FormArray;
    }

    if (checked == true) {
      this.rolewisemenuForm.controls['menuList']
        .controls[menuIndex].controls['childrenData'].controls.map((value: { get: (arg0: string) => { (): any; new(): any; setValue: { (arg0: boolean): any; new(): any; }; }; }) => value.get('isView').setValue(true)) as FormArray;
    } else {
      this.rolewisemenuForm.controls['menuList']
        .controls[menuIndex].controls['childrenData'].controls.map((value: { get: (arg0: string) => { (): any; new(): any; setValue: { (arg0: boolean): any; new(): any; }; }; }) => value.get('isView').setValue(false)) as FormArray;
    }


    (<FormArray>(<FormGroup>(<FormArray>this.rolewisemenuForm.controls['menuList'])
      .controls[menuIndex]).controls['childrenData']).controls.forEach(value => {

        if (value.value.isCreated == true) {
          totalSelected++;
        }

      });
    if (checked == true) {
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('isCreated').setValue(true) as FormArray;
    } else {
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('isCreated').setValue(false) as FormArray;
    }

    if (checked == true) {
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('isUpdated').setValue(true) as FormArray;
    } else {
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('isUpdated').setValue(false) as FormArray;
    }

    if (checked == true) {
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('isView').setValue(true) as FormArray;
    } else {
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('isView').setValue(false) as FormArray;
    }

    if (checked == true) {
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('isDeleted').setValue(true) as FormArray;
    } else {
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('isDeleted').setValue(false) as FormArray;
    }

    let L = this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].length
    console.log("@@@@@@@@@@@@@@@@@@", L)

    if (checked == true) {
      for (let i = 0; i < L; i++) {
        this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('ISCreated').setValue(true) as FormArray;
      }
    }
    else {
      for (let i = 0; i < L; i++) {
        this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('ISCreated').setValue(false) as FormArray;
      }
    }
  }

  isCreatedAllData(paramsObj: any) {

    debugger
    let menuIndex = paramsObj.index
    let checked = paramsObj.checked
    let innerI = paramsObj.innerI
    console.log("########################", innerI)
    var totalSelected = 0;

    if (checked == true) {

      this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isCreated').setValue(true);
      this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isUpdated').setValue(true);
      this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isDeleted').setValue(true);
      this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isView').setValue(true);

      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('isCreated').setValue(true) as FormArray;
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('isUpdated').setValue(true) as FormArray;
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('isDeleted').setValue(true) as FormArray;
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('isView').setValue(true) as FormArray;

      let L = this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].length
      console.log("@@@@@@@@@@@@@@@@@@", L)

      if (checked == true) {
        for (let i = 0; i < L; i++) {
          if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isCreated').value == true && this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isUpdated').value == true && this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isView').value == true && this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isDeleted').value == true) {
            this.rolewisemenuForm.get('menuList')
              .controls[menuIndex].get('IsCreated').setValue(true) as FormArray;
          }
          else {
            this.rolewisemenuForm.get('menuList')
              .controls[menuIndex].get('IsCreated').setValue(false) as FormArray;
            break;

          }
        }
      }

    } else {
      this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isCreated').setValue(false);
      this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isUpdated').setValue(false);
      this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isDeleted').setValue(false);
      this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[innerI].get('isView').setValue(false);

      let L = this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].length
      console.log("@@@@@@@@@@@@@@@@@@", L)

      for (let i = 0; i < 1; i++) {
        if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isCreated').value == false) {
          i = i + 1
          if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isCreated').value == false) {
            i = i + 1
            if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isCreated').value == false) {
              this.rolewisemenuForm.get('menuList')
                .controls[menuIndex].get('isCreated').setValue(false) as FormArray;
              this.rolewisemenuForm.get('menuList')
                .controls[menuIndex].get('IsCreated').setValue(false) as FormArray;
            }
          }
        }
      }

      for (let i = 0; i < 1; i++) {
        if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isUpdated').value == false) {
          i = i + 1
          if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isUpdated').value == false) {
            i = i + 1
            if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isUpdated').value == false) {
              this.rolewisemenuForm.get('menuList')
                .controls[menuIndex].get('isUpdated').setValue(false) as FormArray;
              this.rolewisemenuForm.get('menuList')
                .controls[menuIndex].get('IsCreated').setValue(false) as FormArray;
            }
          }
        }
      }

      for (let i = 0; i < 1; i++) {
        if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isDeleted').value == false) {
          i = i + 1
          if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isDeleted').value == false) {
            i = i + 1
            if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isDeleted').value == false) {
              this.rolewisemenuForm.get('menuList')
                .controls[menuIndex].get('isDeleted').setValue(false) as FormArray;
              this.rolewisemenuForm.get('menuList')
                .controls[menuIndex].get('IsCreated').setValue(false) as FormArray;
            }
          }
        }
      }

      for (let i = 0; i < 1; i++) {
        if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isView').value == false) {
          i = i + 1
          if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isView').value == false) {
            i = i + 1
            if (this.rolewisemenuForm.controls['menuList'].controls[menuIndex].controls['childrenData'].controls[i].get('isView').value == false) {
              this.rolewisemenuForm.get('menuList')
                .controls[menuIndex].get('isView').setValue(false) as FormArray;
              this.rolewisemenuForm.get('menuList')
                .controls[menuIndex].get('IsCreated').setValue(false) as FormArray;
            }
          }
        }
      }

    }

    if (checked == false) {
      this.rolewisemenuForm.get('menuList')
        .controls[menuIndex].get('IsCreated').setValue(false) as FormArray;
    }
  }


  saveRolewisemenu() {
    if (this.rolewisemenuForm.invalid) {
      this.submitteduserData = true;
      return;
    }
    debugger
    let savemenuList: { menuId: any; isCreated: any; isView: any; isUpdated: any; isDeleted: any; }[] = []
    this.rolewisemenuForm.value.menuList.forEach((obj: { menuId: any; isCreated: any; isView: any; isUpdated: any; isDeleted: any; IsCreated: any; ISCreated: any; childrenData: any[]; }) => {
      var customObj = {
        'menuId': obj.menuId,
        'isCreated': obj.isCreated,
        'isView': obj.isView,
        'isUpdated': obj.isUpdated,
        'isDeleted': obj.isDeleted,
      }
      savemenuList.push(customObj)
      if (obj.childrenData.length > 0) {
        obj.childrenData.forEach(obj1 => {
          var customObj1 = {
            'menuId': obj1.menuId,
            'isCreated': obj1.isCreated,
            'isView': obj1.isView,
            'isUpdated': obj1.isUpdated,
            'isDeleted': obj1.isDeleted,
          }
          savemenuList.push(customObj1)
        });
      }
    });
    let rolewisemenuModelObj = {
      "roleId": this.selectedRole,
      "rolewisemenu": savemenuList
    };
    this.adminLayoutService.SaverolewiseMenu(rolewisemenuModelObj).subscribe((Response: any) => {
      debugger
      if (Response.meta.code == 200) {
        this.submitteduserData = false;
        this.selectedRole = null;
        this.onRoleChange();
        // this.commonService.notifier.notify('success', Response.meta.message);
      }
      else {
        // this.commonService.notifier.notify('error', Response.meta.message);
      }
    }, (error) => {
      console.log(error);
    });
  }

}









