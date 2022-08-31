import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EducationService} from '../../../../services/education/education.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  addresses: any[] = [];
  addressesList: any;
  active = false;
  addressForm: any;
  columnsToDisplay = [
    'CityName',
    'Address',
    'operation',
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AddressComponent>,
              private callData: EducationService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.ngGetAddress();
    this.getAllAddresses();
  }

  ngGetAddress(): void {
    const data = {
      MasterCode: this.data
    };
    this.addresses = [];
    this.callData.getAddress(data).subscribe((address) => {
      if (address.state) {
        this.addresses = address.msg;
        this.active = false;
      } else  {
        this.active = true;
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addAddressActive(): void {
    this.active = !this.active;
  }

  getAllAddresses(): void {
    this.callData.getAllAddresses().subscribe((res) => {
      this.addressesList = res.msg;
    });
  }

  ngAddAddress(addressGcode: any): void {
    if (addressGcode) {
      const data = {
        TrainProgAccessGcode: this.data,
        TrainAdressGcode: addressGcode,
        action: 1,
      };
      this.callData.trainProgAccessAddressUpdate(data).subscribe((res) => {
       if (res.state) {
         this.snackBar.open(res.msg, 'x', {
           duration: 10000,
           direction: 'rtl',
           verticalPosition: 'top',
           horizontalPosition: 'start',
           panelClass: 'panel-success'
         });
         this.ngGetAddress();
       } else {
         this.snackBar.open(res.msg, 'x', {
           duration: 10000,
           direction: 'rtl',
           verticalPosition: 'top',
           horizontalPosition: 'start',
           panelClass: 'panel-success'
         });
       }
     });
    } else {
      this.snackBar.open('آدرس را انتخاب کنید.', 'x', {
        duration: 10000,
        direction: 'rtl',
        verticalPosition: 'top',
        horizontalPosition: 'start',
        panelClass: 'panel-error'
      });
    }
  }

  ngDelete(Gcode: string): void {
    if (confirm('آدرس  حدف شود ؟')) {
      const data = {
        GCode: Gcode,
        action: 3
      };
      this.callData.trainProgAccessAddressUpdate(data).subscribe((res) => {
        if (res.state) {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success'
          });
          this.ngGetAddress();
        } else {
          this.snackBar.open(res.msg, 'x', {
            duration: 10000,
            direction: 'rtl',
            verticalPosition: 'top',
            horizontalPosition: 'start',
            panelClass: 'panel-success'
          });
        }
      });
    }
  }
}
