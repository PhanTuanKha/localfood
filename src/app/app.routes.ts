import { Routes } from '@angular/router';
import { Signin } from './auth/sigin/sigin';
import { Register } from './auth/register/register';
import { ForgotPasswordComponent } from './auth/forgot-pasword/forgot-pasword';
import { Mainpage } from './order/mainpage/mainpage';
import { OrderDetail } from './order/order-detail/order-detail';

export const routes: Routes = [{
    path: '', redirectTo: 'mainpage', pathMatch: 'full'},
    // path: '', redirectTo: 'order-detail', pathMatch: 'full'},
    {path: 'signin', component: Signin},
    {path: 'register', component: Register},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'mainpage', component: Mainpage},
    {path: 'order-detail', component: OrderDetail}


    { path: '', component: OrderHistory },
    { path: 'order-review', component: OrderReview },
    { path: 'my-review', component: MyReview },
    { path: 'reviews', component: Reviews },
    { path: 'review-detail', component: ReviewDetail },
    { path: 'reply-detail', component: ReplyDetail },
    { path: 'search', component: SearchDistance},
    { path: 'my-reply', component: MyReply},
    { path: 'gps', component: Gps},
    { path: '', redirectTo: 'reviews', pathMatch: 'full' } 
];
