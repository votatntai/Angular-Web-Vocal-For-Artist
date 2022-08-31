import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { BalanceComponent } from './main/balance/balance.component';
import { DiscoverComponent } from './main/discover/discover.component';
import { HomeComponent } from './main/home/home.component';
import { DetailComponent } from './main/jobs/detail/detail.component';
import { DoneComponent } from './main/jobs/done/done.component';
import { InvitingComponent } from './main/jobs/inviting/inviting.component';
import { JobsComponent } from './main/jobs/jobs.component';
import { PendingComponent } from './main/jobs/pending/pending.component';
import { ProcessingComponent } from './main/jobs/processing/processing.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './main/profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'main', component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'discover',
        component: DiscoverComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'jobs',
        component: JobsComponent,
      },
      {
        path: 'balance',
        component: BalanceComponent
      },
      {
        path: 'jobs/detail/:id',
        component: DetailComponent
      },
      {
        path: 'jobs/pending',
        component: PendingComponent
      },
      {
        path: 'jobs/done',
        component: DoneComponent
      },
      {
        path: 'jobs/processing',
        component: ProcessingComponent
      },
      {
        path: 'jobs/inviting',
        component: InvitingComponent
      },
    ],
  },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
