import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotesCollectionComponent } from './notes-collection/notes-collection.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './signup/signup.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth-guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
    { path: '', component: NotesCollectionComponent, canActivate: [AuthGuard] },
    { path: 'notes', component: NotesCollectionComponent, canActivate:[AuthGuard] },
    { path: 'signup', component: SignupComponent },
    { path: 'confirm-email', component: ConfirmEmailComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class RoutingModule {}

