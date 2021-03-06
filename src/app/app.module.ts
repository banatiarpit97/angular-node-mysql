import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './navbar/navbar.component';
import { NotesCollectionComponent } from './notes-collection/notes-collection.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RoutingModule } from './app-routing.module';
import { AddEditNotesComponent } from './add-edit-notes/add-edit-notes.component';
import { SignupComponent } from './signup/signup.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './services/auth-interceptor';
import { ErrorInterceptor } from './services/error-interceptor';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MaterialModule } from './angular-material.module';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotesCollectionComponent,
    PageNotFoundComponent,
    AddEditNotesComponent,
    SignupComponent,
    ConfirmEmailComponent,
    LoginComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  entryComponents: [AddEditNotesComponent],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
