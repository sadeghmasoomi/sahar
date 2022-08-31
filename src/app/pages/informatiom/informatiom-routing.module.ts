import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformatiomComponent } from './informatiom.component';
import {AccInformatiomComponent} from './acc-informatiom/acc-informatiom.component';

const routes: Routes = [
  { path: '', component: InformatiomComponent, data: {title: 'سایر اطلاعات'}, children: [
      {path: 'AccInformatiom', component: AccInformatiomComponent,  data: {title: 'عملیات روی قرارداد ها'}},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformatiomRoutingModule { }
export const RouteComponentInformatiomPath = [
  InformatiomComponent,
  AccInformatiomComponent,
];
