import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MatToolbarModule,
          MatExpansionModule,
          MatButtonModule,
          MatCardModule,
          MatDialogModule,
          MatInputModule,
          MatCheckboxModule,
          MatProgressSpinnerModule,
          MatPaginatorModule } from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';
import { NotesCollectionComponent } from './notes-collection/notes-collection.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RoutingModule } from './app-routing.module';
import { AddEditNotesComponent } from './add-edit-notes/add-edit-notes.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './services/auth-interceptor';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotesCollectionComponent,
    PageNotFoundComponent,
    AddEditNotesComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  entryComponents: [AddEditNotesComponent],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
