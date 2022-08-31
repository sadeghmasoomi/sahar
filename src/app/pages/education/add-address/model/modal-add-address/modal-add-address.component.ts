import {Component, Inject, OnInit} from '@angular/core';
import {EducationService} from '../../../../../services/education/education.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-add-address',
  templateUrl: './modal-add-address.component.html',
  styleUrls: ['./modal-add-address.component.scss']
})
export class ModalAddAddressComponent implements OnInit {
  citiesData: any;
  selectCities: any;
  citiesKeys: any = [];
  state!: string;
  formData: any = {};
  active = false;
  constructor(private callData: EducationService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ModalAddAddressComponent>,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getFormCities();
  }

  getFormCities(): void {
    this.callData.getFormCities().subscribe((cities) => {
      this.citiesData = cities.msg;
      this.citiesKeys = Object.keys(this.citiesData);
      if (this.data){
        for (const index of this.citiesKeys) {
          for (const sub of index.citeies){
            if (sub.name === this.data.CityName) {
              this.state = index;
              this.selectCities = this.citiesData[index].citeies;
            }
          }
        }
        this.formData = this.data;
        this.active =  true;
      }
    });
  }

  ngAddAddress(data: any, action: any): void {
        if (data) {
          data.action = action;
          this.callData.TrainAddressAction(data).subscribe((res) => {
            if (res.state) {
              this.snackBar.open(res.msg, 'x', {
                duration: 10000,
                direction: 'rtl',
                verticalPosition: 'top',
                horizontalPosition: 'start',
                panelClass: 'panel-success'
              });
              this. onNoClick();
            } else {
              this.snackBar.open(res.msg, 'x', {
                duration: 10000,
                direction: 'rtl',
                verticalPosition: 'top',
                horizontalPosition: 'start',
                panelClass: 'panel-error'
              });
            }
          });
        } else {
          this.snackBar.open('تمامی فیلد ها خالی می باشد.', 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-error'
          });
        }
  }

  importCities(stateValue: string): void {
    this.selectCities = this.citiesData[stateValue].citeies;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
