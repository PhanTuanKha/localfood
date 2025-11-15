import { Routes } from '@angular/router';
import { Signin } from './auth/sigin/sigin';
import { Register } from './auth/register/register';
import { ForgotPasswordComponent } from './auth/forgot-pasword/forgot-pasword';
import { Mainpage } from './order/mainpage/mainpage';
import { OrderDetail } from './order/order-detail/order-detail';
import { GroupOrder } from './order/group-order/group-order';
import { GroupOrderDetail } from './order/group-order-detail/group-order-detail';
import { Aboutus } from './order/aboutus/aboutus';
import { Vendor } from './order/vendor/vendor';

export const routes: Routes = [
  { path: '', redirectTo: 'mainpage', pathMatch: 'full' },
  { path: 'signin', component: Signin },
  { path: 'register', component: Register },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'mainpage', component: Mainpage },
  { path: 'order-detail', component: OrderDetail },

  { path: 'order-history', component: OrderHistory },
  { path: 'order-review', component: OrderReview },
  { path: 'my-review', component: MyReview },
  { path: 'reviews', component: Reviews },
  { path: 'review-detail', component: ReviewDetail },
  { path: 'reply-detail', component: ReplyDetail },
  { path: 'search', component: SearchDistance },
  { path: 'my-reply', component: MyReply },
  { path: 'gps', component: Gps },

  { path: 'group-order', component: GroupOrder },
  { path: 'group-order-detail', component: GroupOrderDetail },
  { path: 'aboutus', component: Aboutus },
  { path: 'vendor', component: Vendor },
];
