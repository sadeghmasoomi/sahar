import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {FirmInfoScoringComponent} from './firm-info-scoring/firm-info-scoring.component';
import {FirmAssessmentComponent} from './firm-assessment/firm-assessment.component';
import {GovFirmInfoComponent} from './gov-firm-info/gov-firm-info.component';
import {AddFirmAssessmentComponent} from './firm-assessment/add-firm-assessment/add-firm-assessment.component';
import {UpdateGovFormInfoComponent} from './gov-firm-info/update-gov-form-info/update-gov-form-info.component';

const routes: Routes = [
  { path: 'FirmAssessment', component: FirmAssessmentComponent, data: {title: 'اطلاعات شرکتهای مشمول طرح'}},
  { path: 'FirmAssessment/:pageNumber', component: FirmAssessmentComponent, data: {title: 'اطلاعات شرکتهای مشمول طرح'}},
  { path: 'FirmAssessment/:pageNumber/:nameSearch', component: FirmAssessmentComponent, data: {title: 'اطلاعات شرکتهای مشمول طرح'}},
  { path: 'FirmInfoScoring', component: FirmInfoScoringComponent, data: {title: 'امتیاز موسسات حسابرسی'}},
  { path: 'GovFirmInfo', component: GovFirmInfoComponent },
  { path: 'FirmInfoScoring/:pageNumber', component: FirmInfoScoringComponent, data: {title: 'امتیاز موسسات حسابرسی'}},
  { path: 'GovFirmInfo/:pageNumber', component: GovFirmInfoComponent, data: {title: 'داشبورد اصلی'}},
  { path: 'FirmInfoScoring/:pageNumber/:nameSearch', component: FirmInfoScoringComponent, data: {title: 'امتیاز موسسات حسابرسی'}},
  { path: 'GovFirmInfo/:pageNumber/:nameSearch', component: GovFirmInfoComponent, data: {title: 'داشبورد اصلی'}},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GovAuditRoutingModule { }

export const RouteGovAuditComponentPath = [
  FirmAssessmentComponent,
  FirmInfoScoringComponent,
  GovFirmInfoComponent,
  AddFirmAssessmentComponent,
  UpdateGovFormInfoComponent
];
