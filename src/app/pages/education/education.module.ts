import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EducationRoutingModule, RouteComponentEducationPath} from './education-routing.module';
import {FlexModule} from '@angular/flex-layout';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import { TrainRegisterComponent } from './train-register/train-register.component';
import {MatTabsModule} from '@angular/material/tabs';
import {ModalAddAddressComponent} from './add-address/model/modal-add-address/modal-add-address.component';
import {AddLessonComponent} from './lesions/modal/add-lesson/add-lesson.component';
import {EditCoursesProgramActionComponent} from './modal/edit-courses-program-action/edit-courses-program-action.component';
import {InstallmentComponent} from './modal/installment/installment.component';
import {AddressComponent} from './modal/address/address.component';
import {TrainProgramAccessActionComponent} from './modal/train-program-access-action/train-program-access-action.component';
import {EditEducationComponent} from './modal/edite-education/edite-education.component';
import {UsersToIntroductionComponent} from './train-firm-user/modal/users-to-introduction/users-to-introduction.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {LessonsComponent} from './modal/lessons/lessons.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {DateTypePipe} from '../pipes/date-type.pipe';
import {PaginationComponent} from '../../layout/pagination/pagination.component';
import {NegToPosSaharPipe} from '../../layout/pips/neg-to-pos-sahar.pipe';
@NgModule({
  declarations: [
    RouteComponentEducationPath,
    TrainRegisterComponent,
    ModalAddAddressComponent,
    AddLessonComponent,
    EditCoursesProgramActionComponent,
    InstallmentComponent,
    AddressComponent,
    TrainProgramAccessActionComponent,
    EditEducationComponent,
    UsersToIntroductionComponent,
    LessonsComponent,
    DateTypePipe,
    PaginationComponent,
    NegToPosSaharPipe,
  ],
  imports: [
    CommonModule,
    EducationRoutingModule,
    FlexModule,
    MatExpansionModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    DpDatePickerModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
  ],
  exports: [
    DateTypePipe,
    PaginationComponent,
    NegToPosSaharPipe
  ]
})

export class EducationModule { }
