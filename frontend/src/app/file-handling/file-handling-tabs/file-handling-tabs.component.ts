import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicesService } from '../../service/services.service';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FileTreeComponent } from './file-tree/file-tree.component';
import { FileReportsComponent } from './file-reports/file-reports.component';
import { FileViewComponent } from './file-view/file-view.component';

@Component({
  selector: 'app-file-handling-tabs',
  templateUrl: './file-handling-tabs.component.html',
  styleUrls: ['./file-handling-tabs.component.scss']
})
export class FileHandlingTabsComponent implements OnInit {

  @ViewChild(FileTreeComponent, { static: false }) fileTreeComponent: FileTreeComponent;
  @ViewChild(FileReportsComponent, { static: false }) fileReportsComponent: FileReportsComponent;
  @ViewChild(FileViewComponent, { static: false }) fileViewComponent: FileViewComponent;

  constructor(private service: ServicesService) { }

  refreshMatTab(data: any) { }

  ngOnInit() {
    // this.getAllTableData();
  }

  onTabChange(data: any) {
    this.fileTreeComponent.getTreeStructureFile();
    this.fileReportsComponent.getTreeStructureFile();
    this.fileReportsComponent.isLeftVisible = false;
    this.fileViewComponent.getAllUserTableData();
  }

}