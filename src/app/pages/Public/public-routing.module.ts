import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicComponent } from './public.component';
import {AuthGuard} from '../../helper/auth.guard';
import { ReportViewComponent } from './report-view/report-view.component';

const routes: Routes = [
  { path: '', component: PublicComponent, children: [
      // { path: 'ReportEdit', component: ReportEditComponent, canActivate: [AuthGuard], data: {title: 'اصلاح'}},
      { path: 'ReportView', component: ReportViewComponent, canActivate: [AuthGuard], data: {title: 'کنترل'}},
    ]}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
export const RoutePublicComponentPath = [
  ReportViewComponent
];
