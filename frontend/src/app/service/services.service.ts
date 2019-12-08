import { Injectable } from '@angular/core';
// import { Http, RequestOptions, URLSearchParams } from '@angular/common/';
import 'rxjs/add/operator/map';
import { HttpClient, HttpEvent, HttpParams, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  url = 'http://localhost:8079/';
  constructor(public http: HttpClient) {

  }

  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  pushBodyWithFileToStorage(
    apiurl: string,
    formdata: FormData,
    userName: string,
    emailAddress: string
  ): Observable<HttpEvent<{}>> {

    let param = new HttpParams();
    const body = {
      apiurl: apiurl,
      formdata: formdata,
      userName: userName,
      emailAddress: emailAddress
    }
    param.append('apiurl', apiurl);
    param.append('userName', userName)
    param.append('emailAddress', emailAddress);

    // headers = headers.append('Content-Type', 'application/json;');
    const req = new HttpRequest('POST', this.url + apiurl +
      '?userName=' + userName + '&email=' + emailAddress + '', formdata, {
        reportProgress: true,
        params: param,
        responseType: 'text'
      });

    // return this.apiCommonService.post('/post', formdata);


    return this.http.request(req);
  }

  //put body to service 
  putBodyWithFileToStorageROOT(
    fileId: any,
    formdata: FormData,
    userName: any,
    emailAddress: any
  ): Observable<HttpEvent<{}>> {

    let param = new HttpParams();
    const body = {
      formdata: formdata,
      userName: userName,
      emailAddress: emailAddress
    }

    // update?fileId=1&userName=sdasdasd&email=sadsadasdasdasdasd
    param.append('fileId', fileId);
    param.append('userName', userName);
    param.append('emailAddress', emailAddress);
    const req = new HttpRequest('PUT', this.url + "file/update" +
      '?fileId=' + fileId + '&userName=' + emailAddress + '&email=' + emailAddress + '', formdata, {
        reportProgress: true,
        params: param,
        responseType: 'text'
      });

    return this.http.request(req);
  }
  putBodyWithFileToStorageREVISED(
    fileId: any,
    revisedFileId: any,
    formdata: FormData,
    userName: any,
    emailAddress: any
  ): Observable<HttpEvent<{}>> {
    let param = new HttpParams();
    const body = {
      formdata: formdata,
      userName: userName,
      emailAddress: emailAddress
    }

    // update?fileId=1&revisedFileId=1&userName=sdasdasd&email=sadsadasdasdasdasd
    param.append('userName', userName);
    param.append('fileId', fileId);
    param.append('emailAddress', emailAddress);
    const req = new HttpRequest('PUT', this.url + "file/update" +
      '?fileId=' + fileId + '&revisedFileId=' + revisedFileId + '&userName=' + userName + '&email=' + emailAddress + '', formdata, {
        reportProgress: true,
        params: param,
        responseType: 'text'
      });
    return this.http.request(req);
  }

  public saveUser(data: any) {
    return this.http.post(this.url + 'v1/user/save', data);
  }

  public getUserDetails() {
    return this.http.get<UserDetails[]>(this.url + "v1/user/");
  }


  public getFileRecords() {
    return this.http.get(this.url + "file/");
  }

  getAllRevisedFileById(data: any) {
    return this.http.get(this.url + "file/" + data);
  }

  getFileTree(){
   return this.http.get<FileRootList[]>(this.url + 'file/tree')
  }

  public getReportsFile() {
    return this.http.get<FileRootList[]>(this.url + "file/reports");
  }

  public rollBackFileByIdAndType(fieldId: any, fileType: any) {
    if (fileType == "Root") {
      return this.http.put(this.url + "file/" + fieldId + "/Root", '');
    } else if (fileType == "Revised") {
      return this.http.put(this.url + "file/" + fieldId + "/Revised", '');
    }
  }
}

export interface FileRootList {
  fileId: any;
  fileName: any;
  data: any;
  userId: any;
  userName: any;
  emailAddress: any;
  creationDate: any;
  modifiedDate: any;
  fileTextData: any;
  revisedFileVOList?: RevisedFileList[];
}

export interface RevisedFileList {
  revisedFileId: any;
  revisedFileName: any;
  userName: any;
  emailAddress: any;
  data: any;
  creationDate: any;
  modifiedDate: any;
  textFileContent: any;
  rootFileName: any;
  rootFileCreatedBy: any;
  rootFileCreationDate: any;
  rootFileModifiedDate: any;
  rootFileUserEmail: any;
}

export interface UserDetails {
  userId: any;
  userName: any;
  emailAddress: any;
}



