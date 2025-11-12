import { Routes } from '@angular/router';
import { Signin } from './auth/sigin/sigin';
import { Register } from './auth/register/register';
import { ForgotPasswordComponent } from './auth/forgot-pasword/forgot-pasword';
import { Mainpage } from './order/mainpage/mainpage';

export const routes: Routes = [{
    path: '', redirectTo: 'mainpage', pathMatch: 'full'},
    {path: 'signin', component: Signin},
    {path: 'register', component: Register},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'mainpage', component: Mainpage}
];