import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { LoginComponent } from '../components/login/login.component';
import { ProfileUpdateComponent } from '../components/profile-update/profile-update.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { AuthGuard, AuthGuardReverse } from '../services/auth-guard.service';

const routes: Routes = [
  {path:"",component:DashboardComponent,canActivate: [AuthGuard]},
  {path:"login",component:LoginComponent,canActivate: [AuthGuardReverse]},
  {path:"profile",component:ProfileComponent,canActivate: [AuthGuard]},
  {path:"profile/update",component:ProfileUpdateComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
