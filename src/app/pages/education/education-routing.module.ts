import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { EducationComponent } from './education.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { LesionsComponent } from './lesions/lesions.component';
import {TrainRegisterComponent} from './train-register/train-register.component';
import { TrainFirmUserComponent } from './train-firm-user/train-firm-user.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: EducationComponent},
  { path: 'TrainCourse', pathMatch: 'full', component: EducationComponent},
  { path: 'TrainCourse/:pageNumber', component: EducationComponent},
  { path: 'TrainCourse/:pageNumber/:nameSearch', component: EducationComponent},
  { path: 'TrainAddress', component: AddAddressComponent},
  { path: 'TrainLesson', component: LesionsComponent},
  { path: 'TrainRegister', component: TrainRegisterComponent},
  { path: 'TrainFirmUser', component: TrainFirmUserComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class EducationRoutingModule { }
export const RouteComponentEducationPath = [
  EducationComponent,
  AddAddressComponent,
  LesionsComponent,
  TrainRegisterComponent,
  TrainFirmUserComponent,
];
