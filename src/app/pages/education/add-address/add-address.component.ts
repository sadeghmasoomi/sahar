import {Component, Inject, OnInit} from '@angular/core';
import {EducationService} from '../../../services/education/education.service';
import {ModalAddAddressComponent} from './model/modal-add-address/modal-add-address.component';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {
  addresses: any;
  columnsToDisplay = [
    'CityName',
    'Code',
    'Address',
    'operation',
  ];

  constructor(private callData: EducationService,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllAddresses();
  }

  getAllAddresses(): void {
    this.callData.getAllAddresses().subscribe((res) => {
      this.addresses = res.msg;
    });
  }

  ngAddAddress(): void {
    const dialogRef = this.dialog.open(ModalAddAddressComponent,
      {
        width: '650px',
      });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllAddresses();
    });
  }

  ngDelete(Gcode: any): void {
    if (confirm('آدرس  حدف شود ؟')) {
      const data = {
        Gcode,
        action: 3
      };
      this.callData.TrainAddressAction(data).subscribe((res) => {
        if (res.state) {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success'
          });
          this.getAllAddresses();
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
    }

  }

  ngEditLesson(data: any): void {
    const dialogRef = this.dialog.open(ModalAddAddressComponent,
      {
        width: '650px',
        data
      });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllAddresses();
    });
  }
}
