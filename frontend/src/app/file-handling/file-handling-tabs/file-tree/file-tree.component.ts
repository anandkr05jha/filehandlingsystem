import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ServicesService, FileRootList, RevisedFileList } from '../../../service/services.service';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { Inject } from '@angular/core';

import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatTableDataSource, MatPaginator, MatTreeFlattener, MatTreeFlatDataSource, MatSnackBar, MatTreeNestedDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';

import { FormArray, FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';

@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.scss']
})
export class FileTreeComponent implements OnInit, AfterViewInit {

  nestedTreeControl: NestedTreeControl<FileRootList>;
  nestedDataSource: MatTreeNestedDataSource<FileRootList>;
  dataChange: BehaviorSubject<FileRootList[]> = new BehaviorSubject<FileRootList[]>([]);


  fileRecords: FileRootList[];
  expandedIndex;
  durationInSeconds = 10;

  constructor(private service: ServicesService,
    private _snackBar: MatSnackBar, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getTreeStructureFile();
  }

  ngAfterViewInit() {
    this.nestedTreeControl = new NestedTreeControl<FileRootList>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
  }

  Collaps(index: number, data: any) {
    this.expandedIndex = index === this.expandedIndex ? -1 : index;
  }

  

  private _getChildren = (node: FileRootList) => { return node.fileName }; 
  hasChild = (_: number, nodeData: RevisedFileList) => { return !(nodeData.revisedFileName) }


  // private _getChildren = (node: FileRootList) => { return node.fileName }; 
  // hasChild = (_: number, nodeData: RevisedFileList) => { return !(nodeData.revisedFileName) }

  getTreeStructureFile() {
    TREE_DATA = [];
    this.fileRecords = [];
    this.service.getFileTree().pipe().subscribe(response => {
      TREE_DATA = response;
      this.fileRecords = response;
      this.dataChange.subscribe(data => this.nestedDataSource.data = TREE_DATA);
    }, err => {
      console.log('Error');
    }, () => {
      console.log('Error');
    });
  }



  viewFileRecord(data: any) {

  }

  viewRecordDialogROOT(data: any) {
    const dialogRef = this.dialog.open(ViewRecordFileComponent, {
      width: '600px',
      data: { fileData: data, type: 'Root' }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  viewRecordDialogREVISED(data: any) {
    const dialogRef = this.dialog.open(ViewRecordFileComponent, {
      width: '600px',
      data: { fileData: data, type: 'Revised' }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openRootRollBackDialog(data: any) {
    const fileId = data.fileId;
    const dialogRef = this.dialog.open(RollBackFileComponent, {
      width: '600px',
      data: { fileId: fileId, type: 'Root' }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getTreeStructureFile();
    });
  }

  openRevisedRollBackDialog(data: any) {
    const fileId = data.revisedFileId;
    const dialogRef = this.dialog.open(RollBackFileComponent, {
      width: '600px',
      data: { fileId: fileId, type: 'Revised' }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getTreeStructureFile();
    });
  }

  openUpdateFileDialogRoot(data: any) {
    const dialogRef = this.dialog.open(UpdateFileDialogComponent, {
      width: '600px',
      data: { rootFileRecord: data, revisedFileRecord: 'NA' }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getTreeStructureFile();
    });
  }

  openUpdateDialogForRevised(data: any, subData: any) {
    const dialogRef = this.dialog.open(UpdateFileDialogComponent, {
      width: '600px',
      data: { rootFileRecord: data, revisedFileRecord: subData }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getTreeStructureFile();
    });
  }
}

let TREE_DATA: FileRootList[] = [];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'view-record-dialog-component',
  templateUrl: './view-record-dialog-component.html',
  styleUrls: ['./file-tree.component.scss']
})
export class ViewRecordFileComponent implements OnInit {

  formData: any;
  type: any;
  durationInSeconds = 10;
  public viewRevisedFileInformation: FormGroup;

  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ViewRecordFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private service: ServicesService) {
    this.formData = data.fileData;
    this.type = data.type;
  }

  ngOnInit(): void {
    if (this.type == 'Root') {
      this.viewRevisedFileInformation = this.fb.group({
        fileName: [this.formData.fileName],
        userName: this.formData.userName,
        emailAddress: this.formData.emailAddress,
        creationDate: this.formData.creationDate,
        modifiedDate: this.formData.modifiedDate,
      });

    } else if (this.type == 'Revised') {
      this.viewRevisedFileInformation = this.fb.group({
        fileName: this.formData.revisedFileName,
        userName: this.formData.userName,
        emailAddress: this.formData.emailAddress,
        creationDate: this.formData.creationDate,
        modifiedDate: this.formData.modifiedDate,
      });

    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  closeDialog() {
    this.dialogRef.close();
  }

}


@Component({
  selector: 'roll-back-dialog-component',
  templateUrl: './roll-Back-dialog-component.html',
  styleUrls: ['./file-tree.component.scss']
})
export class RollBackFileComponent {

  durationInSeconds = 10;
  fileId: any;
  type: any;
  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RollBackFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: ServicesService) {
    this.fileId = data.fileId;
    this.type = data.type;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveRollBack() {
    return this.service.rollBackFileByIdAndType(this.fileId, this.type).pipe().subscribe(response => {
      console.log(response);
      this.onNoClick();
      this.openSnackBar();
    }, err => {
      console.log(err);
      this.openSnackBarFails();
    }, () => {
      this.onNoClick();
    })
  }

  openSnackBar() {
    this._snackBar.openFromComponent(MessageBarComponentFileTree, {
      duration: this.durationInSeconds * 1000,
    });
  }
  openSnackBarFails() {
    this._snackBar.openFromComponent(MessageBarComponentFileFailTree, {
      duration: this.durationInSeconds * 1000,
    });
  }

}



@Component({
  selector: 'update-file-dialog-component',
  templateUrl: './update-file-dialog-component.html',
  styleUrls: ['./file-tree.component.scss']
})
export class UpdateFileDialogComponent {

  selectedFiles: FileList;
  currentFileUpload: File;

  fileId: any;
  revisedFileId: any;
  rootFileRecord: any;
  revisedFileRecord: any;
  durationInSeconds = 10;
  userName = new FormControl('', Validators.required);
  emailAddress = new FormControl('', Validators.required);

  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: ServicesService) {
    this.rootFileRecord = data.rootFileRecord;
    this.revisedFileRecord = data.revisedFileRecord;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  updateFile() {
    this.currentFileUpload = this.selectedFiles.item(0);
    const file = <File>this.currentFileUpload;
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const emailAddress = this.emailAddress.value;
    const url = 'file/save';
    const fileId = this.rootFileRecord.fileId;
    const userName = this.userName.value;

    if (this.revisedFileRecord == 'NA') {

      return this.service.putBodyWithFileToStorageROOT(
        fileId,
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
        console.log(err);
        this.openSnackBarFails();
      }, () => {
        console.log('Enter in the Fincal Block');
        this.dialogRef.close();
      });
    } else if (this.revisedFileRecord != 'NA') {
      const revisedFileId = this.revisedFileRecord.revisedFileId;
      return this.service.putBodyWithFileToStorageREVISED(
        fileId,
        revisedFileId,
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
        console.log(err);
        this.openSnackBarFails();
      }, () => {
        console.log('Enter in the Fincal Block');
        this.dialogRef.close();
      });
    }
  }


  openSnackBar() {
    this._snackBar.openFromComponent(MessageBarComponentFileTree, {
      duration: this.durationInSeconds * 1000,
    });
  }
  openSnackBarFails() {
    this._snackBar.openFromComponent(MessageBarComponentFileFailTree, {
      duration: this.durationInSeconds * 1000,
    });
  }

}



@Component({
  selector: 'message-bar-component-file-tree',
  templateUrl: 'message-bar-component-file-tree.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class MessageBarComponentFileTree { }





@Component({
  selector: 'message-bar-component-file-tree-fails',
  templateUrl: 'message-bar-component-file-tree-fails.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class MessageBarComponentFileFailTree { }