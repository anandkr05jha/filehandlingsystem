import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicesService } from '../service/services.service';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { Inject } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';

import { FormArray, FormBuilder, FormGroup, Validators, } from '@angular/forms';


@Component({
  selector: 'app-file-handling-report',
  templateUrl: './file-handling-report.component.html',
  styleUrls: ['./file-handling-report.component.scss']
})
export class FileHandlingReportComponent implements OnInit {

  panelFirstWidth: any;
  panelFirstHeight: any;
  isLeftVisible: any;

  panelOpenState = false;

  action: any;
  public fileRecords: any;
  revisedFile: any;
  constructor(private service: ServicesService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getTreeStructureFile();
  }

  getTreeStructureFile() {
    this.service.getReportsFile().pipe().subscribe(response => {
      this.fileRecords = response;
    }, err => {
      console.log('Error');
    }, () => {

    });
  }

  viewRootFileById(tableData: any) {
    this.revisedFile = tableData.revisedFileVOList;
  }

  backInRoot() {
    this.getTreeStructureFile();
  }


  openDialogViewRevised(data: any) {
    const dialogRef = this.dialog.open(ViewRevisedFileDialog, {
      width: '600px',
      data: {
        revisedFileId: data.revisedFileId,
        revisedFileName: data.revisedFileName,
        userName: data.userName,
        emailAddress: data.emailAddress,
        data: data.data,
        creationDate: data.creationDate,
        modifiedDate: data.modifiedDate,
        textFileContent: data.textFileContent,
        rootFileName: data.rootFileName,
        rootFileCreatedBy: data.rootFileCreatedBy,
        rootFileCreationDate: data.rootFileCreationDate,
        rootFileModifiedDate: data.rootFileModifiedDate,
        rootFileUserEmail: data.rootFileUserEmail,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.fileId = result;
    });
  }

}





@Component({
  selector: 'view-revised-file-dialog-component',
  templateUrl: 'view-revised-file-dialog-component.html',
  styleUrls: ['./file-handling-report.component.scss']
})
export class ViewRevisedFileDialog implements OnInit {

  formData: any;
  public viewRevisedFileInformation: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ViewRevisedFileDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private service: ServicesService) {
    this.formData = data;
  }



  ngOnInit(): void {
    this.viewRevisedFileInformation = this.fb.group({
      revisedFileId: this.formData.revisedFileId,
      revisedFileName: this.formData.revisedFileName,
      userName: this.formData.userName,
      emailAddress: this.formData.emailAddress,
      data: this.formData.data,
      status: this.formData.status,
      creationDate: this.formData.creationDate,
      modifiedDate: this.formData.modifiedDate,
      rootFileName: this.formData.rootFileName,
      rootFileUserEmail: this.formData.rootFileUserEmail,
      rootFileCreatedBy: this.formData.rootFileCreatedBy,
      rootFileCreationDate: this.formData.rootFileCreationDate,
      rootFileModifiedDate: this.formData.rootFileModifiedDate,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  closeDialog() {
    this.dialogRef.close();
  }

}