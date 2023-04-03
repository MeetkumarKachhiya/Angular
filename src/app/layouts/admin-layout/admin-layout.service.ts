import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CommonService } from '../../shared/common.service';

@Injectable({
    providedIn: 'root'
})

export class AdminLayoutService {
    SaverolewiseMenu(rolewisemenuData: any) {
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminAuth/save-rolewisemenu', rolewisemenuData, { headers: headers });
    }
    environment: any;

    constructor(private commonService: CommonService, private http: HttpClient) { }
    // constructor(private http: HttpClient) { }

    // changePassword(updatechangepwdData: any) {
    //     let headers = new HttpHeaders({
    //         'Authorization': `Bearer ${localStorage.getItem('myToken')}`
    //     })
    //     return this.http.post(this.commonService.rootData.rootUrl + 'auth/changePassword-user', updatechangepwdData, { headers: headers });
    // }

    SaveUserBasicInfoMaster(createuserMasterData: any) {
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/empInfoSave', createuserMasterData, { headers: headers });
    }

    SaveImgMaster(createuserMasterData: any) {
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'blog/Blog-create', createuserMasterData, { headers: headers });
    }

    SaveImageMaster(createuserMasterData: any) {
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/empInfoSave', createuserMasterData, { headers: headers });
    }

    getBasicDetailsByEmployeeID(documentUploadByID: any) {
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/basicDetailsById', { params: documentUploadByID, headers: headers });
    }

    UpdateUserBasicInfoMaster(updateuserMasterData: any) {
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/empInfoUpdate', updateuserMasterData, { headers: headers });
    }

    getuserList() {
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/getEmpInfoList', { headers: headers });
    }

    getImgList() {
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/getImgList', { headers: headers });
    }

    getSidemenuList() {
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminAuth/get-sidemenulist', { headers: headers });
    }

    getblogMaster() {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'blog/blog-List', { headers: headers });
    }

    Statusblog(updatestatusblogData: any) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'blog/blog-statusActiveDeactive', updatestatusblogData, { headers: headers });
    }

    SaveblogMaster(createblogMasterData: any) {
        let headers = new HttpHeaders({
            /*'Content-Type': 'form-data',*/
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'blog/Blog-create', createblogMasterData, { headers: headers });
    }


    getblogMasterId(params: any) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'blog/blog-DeatilsById', { params: params, headers: headers });
    }

    UpdateblogMaster(updateblogMasterData: any) {
        let headers = new HttpHeaders({
            //'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'blog/blog-update', updateblogMasterData, { headers: headers });
    }

    getNewsMasterList() {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'blog/newsListForAdmin', { headers: headers });
    }

    SaveNewsMaster(createblogMasterData: any) {
        let headers = new HttpHeaders({
            /*'Content-Type': 'form-data',*/
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'blog/createNews', createblogMasterData, { headers: headers });
    }


    getNewsMasterId(params: any) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'blog/newsDetailsByIdForAdmin', { params: params, headers: headers });
    }

    UpdateNewsMaster(updateblogMasterData: any) {
        let headers = new HttpHeaders({
            //'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'blog/NewsUpdate', updateblogMasterData, { headers: headers });
    }


    StatusNews(updatestatusblogData: any) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'blog/newsActiveDeactive', updatestatusblogData, { headers: headers });
    }

    SaveInvoiceMaster(createuserMasterData: any) {
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'BillMaster/billMasterSave', createuserMasterData, { headers: headers });
    }

    billMasterList() {
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'BillMaster/billMasterList', { headers: headers });
    }

    getInvoiceByID(documentUploadByID: any) {
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'BillMaster/billMasterListById', { params: documentUploadByID, headers: headers });
    }

    UpdateInvoiceMaster(updateblogMasterData: any) {
        let headers = new HttpHeaders({
            //'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'BillMaster/billMasterUpdate', updateblogMasterData, { headers: headers });
    }

    getRolewisemenuList(params: any) {
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminAuth/roleWiseMenuList', { params: params, headers: headers });
    }

    getRoleList() {
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminAuth/activeRoleList', { headers: headers });
    }

    SavePackageMaster(createuserMasterData: any) {
        // let headers = new HttpHeaders({
        //     'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        // })
        return this.http.post('http://localhost:3012/v1/packageMaster/packageCreate', createuserMasterData);
    }

    packageDataList() {
        // let headers = new HttpHeaders({
        //     'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        // })
        return this.http.get('http://localhost:3012/v1/packageMaster/packageList');
    }

    getPackageByID(documentUploadByID: any) {
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.get('http://localhost:3012/v1/packageMaster/packageListByID', { params: documentUploadByID, headers: headers });
    }

    UpdatePackageMaster(updatePackageMasterData: any) {
        // let headers = new HttpHeaders({
        //     //'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        // })
        return this.http.post('http://localhost:3012/v1/packageMaster/packageUpdate', updatePackageMasterData);
    }

    DeletePackage(documentUploadByID: any) {
        // let headers = new HttpHeaders({
        //     'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        // })
        return this.http.get('http://localhost:3012/v1/packageMaster/packageDelete', { params: documentUploadByID });
    }

    mediaMasterSave(createuserMasterData: any) {
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.post('http://localhost:3006/v1/mediamaster/mediamaster-create', createuserMasterData, { headers: headers });
    }
    

    getMediaList() {
        // let headers = new HttpHeaders({
        //     'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        // })
        return this.http.get('http://localhost:3006/v1/mediamaster/getdocumentlist');
    }

    DeleteMediaByID(documentUploadByID: any) {
        // let headers = new HttpHeaders({
        //     'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        // })
        return this.http.get('http://localhost:3006/v1/mediamaster/deletedocumentById', { params: documentUploadByID });
    }

}

