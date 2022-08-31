import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaharPaymentComponent } from './sahar-payment.component';
import {AuditorIncomComponent} from './auditor-incom/auditor-incom.component';
import {AuditorIncomControlComponent} from './auditor-incom-control/auditor-incom-control.component';


const routes: Routes = [
  { path: '', component: SaharPaymentComponent },
  { path: '', component: SaharPaymentComponent, children: [
      { path: 'AuditorIncom', component: AuditorIncomComponent },
      { path: 'AuditorIncomControl', component: AuditorIncomControlComponent },
    ]}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaharPaymentRoutingModule { }
export const RouteComponentSaharPaymentPath = [
  AuditorIncomComponent,
  AuditorIncomControlComponent,
];
