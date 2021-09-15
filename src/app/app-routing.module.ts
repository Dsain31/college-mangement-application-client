import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./view-model/login/login.module').then( m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./view-model/register/register.module').then( m => m.RegisterModule)
  },
  {
    path: 'admin-list',
    loadChildren: () => import('./view-model/admin-list/admin-list.module').then( m => m.AdminListModule)
  },
  {
    path: 'student-list',
    loadChildren: () => import('./view-model/student-list/student-list.module').then( m => m.StudentListModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./view-model/dashboard/dashboard.module').then( m => m.DashboardModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
