import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileHandlingTabsComponent } from './file-handling-tabs/file-handling-tabs.component';
import { FileReportsComponent } from './file-handling-tabs/file-reports/file-reports.component';
import { FileViewComponent } from './file-handling-tabs/file-view/file-view.component';
import { FileTreeComponent } from './file-handling-tabs/file-tree/file-tree.component';


const routes: Routes = [
  {
    path: '',
    component: FileHandlingTabsComponent
  }, {
    path: 'file-hanling',
    component: FileHandlingTabsComponent
  },
  { path: 'file-view', component: FileViewComponent },
  { path: 'file-tree', component: FileTreeComponent },
  { path: 'file-reports', component: FileReportsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileHandlingRoutingModule { }
