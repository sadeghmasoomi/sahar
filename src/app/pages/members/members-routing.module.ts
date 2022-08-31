import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MemberAuditorComponent } from './member-auditor/member-auditor.component';
import { FirmAuditorComponent } from './firm-auditor/firm-auditor.component';
import {AddFirmAuditorComponent} from './add-firm-auditor/add-firm-auditor.component';
import { AddMemberAuditorComponent } from './add-member-auditor/add-member-auditor.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserInfoEducationComponent } from './user-info-education/user-info-education.component';
import { UserInfoResumeComponent } from './user-info-resume/user-info-resume.component';
import { UserInfoLanguageComponent } from './user-info-language/user-info-language.component';
import { UserInfoCComponent } from './user-info-c/user-info-c.component';
import {MemberAuditorAcceptComponent} from './member-auditor-accept/member-auditor-accept.component';
import { FirmAuditorAcceptComponent } from './firm-auditor-accept/firm-auditor-accept.component';
import {FirmReport1Component} from './firm-report1/firm-report1.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: MemberAuditorComponent},
  { path: 'MemberAuditor', component: MemberAuditorComponent},
  { path: 'MemberAuditor/:pageNumber', component: MemberAuditorComponent},
  { path: 'MemberAuditor/:pageNumber/:nameSearch', component: MemberAuditorComponent},
  { path: 'MemberAuditorAccept', component: MemberAuditorAcceptComponent},
  { path: 'FirmAuditorAccept', component: FirmAuditorAcceptComponent},
  { path: 'addMemberAuditor/:lastCode', component: AddMemberAuditorComponent},
  { path: 'addMemberAuditor/:id', component: AddMemberAuditorComponent},
  { path: 'FirmAuditor', component: FirmAuditorComponent},
  { path: 'addFirmAuditor', component: AddFirmAuditorComponent},
  { path: 'addFirmAuditor/:id', component: AddFirmAuditorComponent},
  { path: 'UserInfo', component: UserInfoComponent},
  { path: 'UserInfoEducation', component: UserInfoEducationComponent},
  { path: 'UserInfoResume', component: UserInfoResumeComponent},
  { path: 'UserInfoLanguage', component: UserInfoLanguageComponent},
  { path: 'UserInfoC', component: UserInfoCComponent},
  { path: 'UserInfoC/:pageNumber', component: UserInfoCComponent},
  { path: 'UserInfoC/:pageNumber/:nameSearch', component: UserInfoCComponent},
  { path: 'FirmReport1', component: FirmReport1Component},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MembersRoutingModule {
  constructor() {}
}
export const RouterComponentModule = [
  MemberAuditorComponent,
  FirmAuditorComponent,
  AddFirmAuditorComponent,
  AddMemberAuditorComponent,
  UserInfoComponent,
  UserInfoEducationComponent,
  UserInfoResumeComponent,
  UserInfoLanguageComponent,
  UserInfoCComponent,
  MemberAuditorAcceptComponent,
  FirmAuditorAcceptComponent,
  FirmReport1Component,
];
