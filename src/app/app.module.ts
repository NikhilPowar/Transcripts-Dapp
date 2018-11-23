import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    ConnectComponent,
    SignupComponent,
    LoginComponent,
    PageNotFoundComponent,
    ApplicationFormComponent,
    IncludesValuePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    AngularFileUploaderModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
