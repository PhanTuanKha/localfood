import { Routes } from '@angular/router';
import { Signin } from './auth/sigin/sigin';
import { Register } from './auth/register/register';
import { ForgotPasswordComponent } from './auth/forgot-pasword/forgot-pasword';

export const routes: Routes = [{
    path: '', redirectTo: 'signin', pathMatch: 'full'},
    {path: 'signin', component: Signin},
    {path: 'register', component: Register},
    {path: 'forgot-password', component: ForgotPasswordComponent}
];