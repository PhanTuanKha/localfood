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
import { OrderHistory } from './order/order-history/order-history';
import { OrderReview } from './order/order-review/order-review';
import { MyReview } from './order/my-review/my-review';
import { Reviews } from './order/reviews/reviews';
import { ReviewDetail } from './order/review-detail/review-detail';
import { ReplyDetail } from './order/reply-detail/reply-detail';
import { SearchDistance } from './order/search-distance/search-distance';
import { MyReply } from './order/my-reply/my-reply';
import { Gps } from './order/gps/gps';
import { Detail } from './order/detail/detail';
import { CartSidebar } from './order/cart-sidebar/cart-sidebar';
import { Account } from './pages/account/account';
import { Settings } from './pages/settings/settings';
import { Support } from './pages/support/support';
import { Help } from './pages/help/help';
import { FavoritesComponent } from './pages/favorites/favorites';
export const routes: Routes = [
  { path: '', redirectTo: 'reply-detail', pathMatch: 'full' },
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
  {path: 'detail', component: Detail},
  {path: 'cart-sidebar', component: CartSidebar},
  { path: 'account', component: Account },
  { path: 'settings', component: Settings },
  { path: 'support', component: Support },
  { path: 'help', component: Help },
  { path: 'signin', component: Signin },
  {path: 'favorites', component: FavoritesComponent}
];
