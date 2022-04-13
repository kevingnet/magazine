import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const rolesModule = () => import('./roles/roles.module').then(x => x.RolesModule);
const ratingsModule = () => import('./ratings/ratings.module').then(x => x.RatingsModule);
const categoriesModule = () => import('./categories/categories.module').then(x => x.CategoriesModule);
const subscriptionStatusesModule = () => import('./subscription_statuses/subscription_statuses.module').then(x => x.SubscriptionStatusesModule);
const contentStatusesModule = () => import('./content_statuses/content_statuses.module').then(x => x.ContentStatusesModule);
const subscriptionsModule = () => import('./subscriptions/subscriptions.module').then(x => x.SubscriptionsModule);
const contentsModule = () => import('./contents/contents.module').then(x => x.ContentsModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
  { path: 'roles', loadChildren: rolesModule, canActivate: [AuthGuard] },
  { path: 'ratings', loadChildren: ratingsModule, canActivate: [AuthGuard] },
  { path: 'categories', loadChildren: categoriesModule, canActivate: [AuthGuard] },
  { path: 'subscription_statuses', loadChildren: subscriptionStatusesModule, canActivate: [AuthGuard] },
  { path: 'content_statuses', loadChildren: contentStatusesModule, canActivate: [AuthGuard] },
  { path: 'subscriptions', loadChildren: subscriptionsModule, canActivate: [AuthGuard] },
  { path: 'contents', loadChildren: contentsModule, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
