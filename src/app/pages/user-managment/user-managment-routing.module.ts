import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserManagmentComponent } from './user-managment.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { RUserFirmFlowComponent } from './ruser-firm-flow/ruser-firm-flow.component';
import { UserCreateNtswComponent } from './user-create-ntsw/user-create-ntsw.component';

const routes: Routes = [
  { path: '', component: UserManagmentComponent },
  {
    path: '',
    component: UserManagmentComponent,
    children: [
      { path: 'UserCreate', component: UserCreateComponent },
      { path: 'RUserFirmFlow', component: RUserFirmFlowComponent },
      { path: 'UserCreateNtsw', component: UserCreateNtswComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagmentRoutingModule {}
export const RouteComponentUserManagment = [
  UserCreateComponent,
  RUserFirmFlowComponent,
  UserCreateNtswComponent,
];
