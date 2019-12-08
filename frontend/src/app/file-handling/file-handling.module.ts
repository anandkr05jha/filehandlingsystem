import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatButtonModule, MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
// import {  RequestOptions } from 'http';
import { ServicesService } from '../service/services.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTreeModule } from '@angular/material/tree';

import { MatNativeDateModule } from '@angular/material/core';
import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FileHandlingRoutingModule } from './file-handling-routing.module';
import { FileHandlingTabsComponent } from './file-handling-tabs/file-handling-tabs.component';
import { FileReportsComponent, ViewRevisedFileDialog } from './file-handling-tabs/file-reports/file-reports.component';
import {
  FileViewComponent,
  MessageBarComponentFileForm,
  MessageBarComponentFileFormFails,
  UploadFileDialog,
  RegisterUserDialog
} from './file-handling-tabs/file-view/file-view.component';
import {
  FileTreeComponent,
  MessageBarComponentFileFailTree,
  MessageBarComponentFileTree,
  UpdateFileDialogComponent,
  RollBackFileComponent,
  ViewRecordFileComponent
} from './file-handling-tabs/file-tree/file-tree.component';
import { ViewLeftRightPanelComponent } from './file-handling-tabs/file-reports/view-left-right-panel/view-left-right-panel.component';


@NgModule({
  declarations: [
    FileHandlingTabsComponent,
    FileReportsComponent,
    ViewRevisedFileDialog,

    FileViewComponent,
    MessageBarComponentFileForm,
    MessageBarComponentFileFormFails,
    UploadFileDialog,
    RegisterUserDialog,



    FileTreeComponent,
    MessageBarComponentFileFailTree,
    MessageBarComponentFileTree,
    UpdateFileDialogComponent,
    RollBackFileComponent,
    ViewRecordFileComponent,


    ViewLeftRightPanelComponent],

  imports: [
    CommonModule,
    FileHandlingRoutingModule,
    MatDialogModule,
    MatButtonModule,
    // HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTreeModule,
    MatNativeDateModule, CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    MatExpansionModule
  ], entryComponents: [
    MessageBarComponentFileForm,
    MessageBarComponentFileFormFails,
    UploadFileDialog,
    MessageBarComponentFileFailTree,
    MessageBarComponentFileTree,
    UpdateFileDialogComponent,
    RollBackFileComponent,
    ViewRecordFileComponent,
    ViewRevisedFileDialog,
    RegisterUserDialog

  ],

})
export class FileHandlingModule { }
