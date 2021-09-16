import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    path: 'application',
    loadChildren: () => import('./view-model/application/application.module').then( m => m.ApplicationModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
