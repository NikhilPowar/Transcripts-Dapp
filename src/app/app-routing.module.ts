import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectComponent } from './connect/connect.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationViewComponent } from './application-view/application-view.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { Web3ConnectedGuard } from './web3-connected.guard';
import { LoggedInGuard } from './logged-in.guard';
import { AdministratorGuard } from './administrator.guard';
import { SharedViewComponent } from './shared-view/shared-view.component';

const appRoutes: Routes = [
  {
    path: 'connect',
    component: ConnectComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [Web3ConnectedGuard]
  },
  {
    path: 'application',
    component: ApplicationFormComponent,
    canActivate: [Web3ConnectedGuard, LoggedInGuard]
  },
  {
    path: 'application-list',
    component: ApplicationListComponent,
    canActivate: [Web3ConnectedGuard, LoggedInGuard]
  },
  {
    path: 'application-view/:transcriptAddress',
    component: ApplicationViewComponent,
    canActivate: [Web3ConnectedGuard, LoggedInGuard]
  },
  {
    path: 'user-page',
    component: UserPageComponent,
    canActivate: [Web3ConnectedGuard, LoggedInGuard]
  },
  {
    path: 'admin-page',
    component: AdminPageComponent,
    canActivate: [Web3ConnectedGuard, LoggedInGuard, AdministratorGuard]
  },
  {
    path: 'shared-view/:transcriptAddress',
    component: SharedViewComponent
  },
  {
    path: '',
    redirectTo: 'connect',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
