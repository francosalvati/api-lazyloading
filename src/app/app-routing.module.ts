import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo:'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
    loadChildren: () => import('./features/home/home-routing.module').then(m => m.HomeRoutingModule)
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    component:LoginComponent,
    loadChildren: () => import('./features/login/login-routing.module').then(m => m.LoginRoutingModule)
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
