import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {PublicRoutingModule, RoutePublicComponentPath} from './public-routing.module';
import { PublicComponent } from './public.component';
import {FormsModule} from '@angular/forms';
import {SaharModule} from '../sahar/sahar.module';
import {MatButtonModule} from '@angular/material/button';
import {FlexModule} from '@angular/flex-layout';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [
    PublicComponent,
    RoutePublicComponentPath,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    SaharModule,
    MatButtonModule,
    FlexModule,
    MatExpansionModule
  ]
})
export class PublicModule { }
