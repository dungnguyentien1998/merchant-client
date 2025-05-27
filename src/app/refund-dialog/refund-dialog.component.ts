import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-refund-dialog',
  templateUrl: './refund-dialog.component.html',
  styleUrls: ['./refund-dialog.component.scss']
})
export class RefundDialogComponent {

  amountControl = new FormControl('', [Validators.required, Validators.min(0.01)]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { orderId: string },
    public dialogRef: MatDialogRef<RefundDialogComponent>
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.amountControl.valid) {
      this.dialogRef.close({
        orderId: this.data.orderId,
        amount: this.amountControl.value
      });
    }
  }

}
