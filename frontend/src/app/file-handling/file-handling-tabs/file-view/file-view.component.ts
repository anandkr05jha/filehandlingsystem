import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { ServicesService, UserDetails } from '../../../service/services.service';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { FormArray, FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.scss']
})
export class FileViewComponent implements OnInit, AfterViewInit {

  action: any;
  durationInSeconds = 10;
  public rootFileData: any = [];
  public revisedFileData: any = [];
  userDetails: UserDetails[];
  result: any;
  constructor(private service: ServicesService, private _snackBar: MatSnackBar, public dialog: MatDialog, private _fb: FormBuilder) { }

  displayedColumns: string[] = ['userId', 'userName', 'emailAddress', 'createdDate', 'updatedDate'];
  dataSource = new MatTableDataSource<UserDetails>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  ngOnInit() {
    this.getAllUserTableData();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngAfterViewInit() {
  }


  getAllUserTableData() {
    this.rootFileData = [];
    this.service.getUserDetails().pipe().subscribe(response => {
      this.userDetails = response;
    }, err => {

    }, () => {
      this.dataSource = new MatTableDataSource(this.userDetails);
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UploadFileDialog, {
      width: '600px',
      data: { result: this.result }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed  ::: ' + result);
      this.getAllUserTableData();
    });
  }

  openUserRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterUserDialog, {
      width: '600px',
      data: { result: this.result }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ::: ' + result);
      this.getAllUserTableData();
    });
  }



  openSnackBar() {
    this._snackBar.openFromComponent(MessageBarComponentFileForm, {
      duration: this.durationInSeconds * 1000,
    });
  }
  openSnackBarFails() {
    this._snackBar.openFromComponent(MessageBarComponentFileFormFails, {
      duration: this.durationInSeconds * 1000,
    });
  }
}

@Component({
  selector: 'register-user-component-dialog',
  templateUrl: 'register-user-component-dialog.html',
  styleUrls: ['./file-view.component.scss']
})
export class RegisterUserDialog implements OnInit {


  durationInSeconds = 10;
  userRegisterForm: FormGroup;
  constructor(private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RegisterUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _fb: FormBuilder, private service: ServicesService) { }

  ngOnInit() {
    this.userRegisterForm = this._fb.group({
      userId: [''],
      userName: ['', [Validators.required]],
      emailAddress: ['', [Validators.required]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  saveUserRecord(data: any) {
    if (this.userRegisterForm.valid) {
      const body = {
        'userId': data.controls.userId.value,
        'userName': data.controls.userName.value,
        'emailAddress': data.controls.emailAddress.value,
      }
      return this.service.saveUser(body).pipe().subscribe(response => {
        console.log(response + ' -------- ');
        this.openSnackBar();
      }, err => {
        this.openSnackBarFails();
      }, () => {
        this.userRegisterForm.reset();
        this.onNoClick();
      })
    } else {
      this.openSnackBarFails();
    }


  }

  openSnackBar() {
    this._snackBar.openFromComponent(MessageBarComponentFileForm, {
      duration: this.durationInSeconds * 1000,
    });
  }
  openSnackBarFails() {
    this._snackBar.openFromComponent(MessageBarComponentFileFormFails, {
      duration: this.durationInSeconds * 1000,
    });
  }

}


@Component({
  selector: 'upload-file-dialog',
  templateUrl: 'upload-file-dialog.html',
  styleUrls: ['./file-view.component.scss']
})
export class UploadFileDialog {

  selectedFiles: FileList;
  currentFileUpload: File;

  userName = new FormControl('', Validators.required);
  emailAddress = new FormControl('', Validators.required);

  durationInSeconds = 10;

  constructor(private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UploadFileDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: ServicesService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }



  saveFile() {
    this.currentFileUpload = this.selectedFiles.item(0);
    const file = <File>this.currentFileUpload;
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const emailAddress = this.emailAddress.value;
    const userName = this.userName.value;
    const url = 'file/save';
    return this.service.pushBodyWithFileToStorage(
      url,
      formdata,
      userName,
      emailAddress
    ).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded! Save Data and Document');
        console.log(event);
        this.openSnackBar();
      }
    }, err => {
      console.log('error :::');
      this.openSnackBarFails();
    }, () => {
      console.log('Enter in the Final Block');
      this.dialogRef.close();
    });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(MessageBarComponentFileForm, {
      duration: this.durationInSeconds * 1000,
    });
  }
  openSnackBarFails() {
    this._snackBar.openFromComponent(MessageBarComponentFileFormFails, {
      duration: this.durationInSeconds * 1000,
    });
  }

}


@Component({
  selector: 'message-bar-component-file-form',
  templateUrl: 'message-bar-component-file-form.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class MessageBarComponentFileForm { }





@Component({
  selector: 'message-bar-component-file-form-fails',
  templateUrl: 'message-bar-component-file-form-fails.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})

export class MessageBarComponentFileFormFails { }

export interface UserDetails {
  userId: any;
  userName: any;
  emailAddress: any;
  createdDate: any;
  updatedDate: any;
}

const ELEMENT_DATA: UserDetails[] = [];

