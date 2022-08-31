import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-personal-entity',
  templateUrl: './personal-entity.component.html',
  styleUrls: ['./personal-entity.component.scss']
})
export class PersonalEntityComponent {
  addFormPersonal: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.addFormPersonal = formBuilder.group({
      NationalId: ['', [Validators.required, Validators.pattern(/^-?(0|[0-9]\d*)?$/)]]
    });
  }

  get f(): any { return this.addFormPersonal.controls; }

  ngSearchCompany(): void {
    this.submitted = true;
    if (this.addFormPersonal.invalid) {
      this.snackBar.open('آیدی شخص به درستی وارد نشده است', 'x', {
        duration: 10000,
        direction: 'rtl',
        verticalPosition: 'top',
        horizontalPosition: 'start',
        panelClass: 'panel-error'
      });
    } else {
      this.router.navigate(['Sahar/Personalentitiesandindividuals/person', this.f.NationalId.value]);
    }
  }
}
