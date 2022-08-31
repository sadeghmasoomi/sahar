import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {LoginComponent} from './pages/login/login.component';
import {AuthGuard} from './helper/auth.guard';
import {InfoSiteComponent} from './pages/info-site/info-site.component';
import {InsureComponent} from './pages/insure/insure.component';
import {InsureAcceptFComponent} from './pages/insure-accept-f/insure-accept-f.component';
import {InsureViewComponent} from './pages/insure-view/insure-view.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard],  data: {title: 'داشبورد اصلی'}},
  { path: 'login', component: LoginComponent,  data: {title: 'ورود'}},
  { path: 'info', component: InfoSiteComponent},
  { path: 'Insure/InsureAccept', component: InsureComponent, canActivate: [AuthGuard], data: {title: 'تائید شرکت برای حسابرسی بیمه'}},
  { path: 'Insure/InsureAcceptF', component: InsureAcceptFComponent, canActivate: [AuthGuard], data: {title: 'ورود'}},
  { path: 'Insure/InsureView', component: InsureViewComponent, canActivate: [AuthGuard], data: {title: 'پنل حسابرسی بیمه جامعه حسابداران'}},
  { path: 'Insure/InsureAccept/:pageNumber', component: InsureComponent, canActivate: [AuthGuard], data: {title: 'تائید شرکت برای حسابرسی بیمه'}},
  { path: 'Insure/InsureAccept/:pageNumber/:nameSearch', component: InsureComponent, canActivate: [AuthGuard], data: {title: 'تائید شرکت برای حسابرسی بیمه'}},
  { path: 'Insure/InsureAcceptF/:pageNumber/:nameSearch',
    component: InsureAcceptFComponent, canActivate: [AuthGuard], data: {title: 'تائید شرکت برای حسابرسی بیمه'}},
  { path: 'GovAudit', canActivate: [AuthGuard] , data: {title: 'سامانه انتخاب حسابرس اصلح'},
    loadChildren: () => import('./pages/gov-audit/gov-audit.module').then(g => g.GovAuditModule)},
  { path: 'Sahar', canActivate: [AuthGuard] , data: {title: 'سامانه سحر'},
    loadChildren: () => import('./pages/sahar/sahar.module').then(s => s.SaharModule)},
  { path: 'SaharMember', canActivate: [AuthGuard] , data: {title: 'سحر -  اعضاء'},
    loadChildren: () => import('./pages/members/members.module').then(m => m.MembersModule)},
  { path: 'SaharControl', canActivate: [AuthGuard] , data: {title: 'کنترل سامانه سحر'},
    loadChildren: () => import('./pages/sahar-control/sahar-control.module').then(sc => sc.SaharControlModule)},
  { path: 'SaharTrain', canActivate: [AuthGuard] , data: {title: 'آموزش'},
    loadChildren: () => import('./pages/education/education.module').then(a => a.EducationModule)},
  { path: 'Jam', loadChildren: () => import('./pages/jam/jam.module').then(m => m.JamModule)},
  { path: 'Public', loadChildren: () => import('./pages/public/public.module').then(m => m.PublicModule) },
  { path: 'SaharPayment', loadChildren: () => import('./pages/sahar-payment/sahar-payment.module').then(m => m.SaharPaymentModule) },
  { path: 'UserManagment', loadChildren: () =>
      import('./pages/user-managment/user-managment.module').then(m => m.UserManagmentModule) },
  { path: 'Informatiom', loadChildren: () => import('./pages/informatiom/informatiom.module').then(m => m.InformatiomModule) },
  { path: '**', component: PageNotFoundComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RouteComponentPath = [
  DashboardComponent,
  LoginComponent,
  PageNotFoundComponent,
  InfoSiteComponent,
  InsureComponent,
  InsureAcceptFComponent,
  InsureViewComponent,
];
