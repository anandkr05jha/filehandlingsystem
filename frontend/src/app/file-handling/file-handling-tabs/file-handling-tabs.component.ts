import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicesService } from '../../service/services.service';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import {CollectionViewer, SelectionChange} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-file-handling-tabs',
  templateUrl: './file-handling-tabs.component.html',
  styleUrls: ['./file-handling-tabs.component.scss']
})
export class FileHandlingTabsComponent implements OnInit {

  constructor(private service: ServicesService) { }

  refreshMatTab(data: any){  }
  
  ngOnInit() {
    // this.getAllTableData();
  }

  onTabChange(data: any){


  }

}