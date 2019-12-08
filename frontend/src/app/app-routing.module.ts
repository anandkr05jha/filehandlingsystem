import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: 'src/app/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'file-hanling',
    loadChildren: 'src/app/file-handling/file-handling.module#FileHandlingModule'
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
function newFunction(): string {
  return 'file-hanling';
}

