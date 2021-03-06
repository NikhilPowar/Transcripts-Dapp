import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import { MatInputModule, MatFormFieldModule, MatSelectModule, MatProgressSpinnerModule, MatGridListModule, MatRippleModule, MatDialogModule, MatToolbarModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ConnectComponent } from './connect/connect.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { LoginPopupComponent } from './login/login-popup.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationViewComponent } from './application-view/application-view.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

import { IncludesValuePipe } from './pipes/includes-value.pipe';
import { GreaterThanPipe } from './pipes/greater-than.pipe';
import { UserPageComponent } from './user-page/user-page.component';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { SharedViewComponent } from './shared-view/shared-view.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectComponent,
    LoginComponent,
    LoginPopupComponent,
    PageNotFoundComponent,
    ApplicationFormComponent,
    IncludesValuePipe,
    GreaterThanPipe,
    ApplicationListComponent,
    ApplicationViewComponent,
    AdminPageComponent,
    UserPageComponent,
    ModalDialogComponent,
    SharedViewComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    MatRippleModule,
    MatCardModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ModalDialogComponent
  ]
})
export class AppModule { }
