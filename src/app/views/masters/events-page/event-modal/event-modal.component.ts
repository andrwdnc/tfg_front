import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CheckoutPageComponent } from '../checkout-page/checkout-page.component';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss'],
})
export class EventModalComponent {
  public itemForm: UntypedFormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EventModalComponent>,
    private fb: UntypedFormBuilder,
    private http: HttpClient
  ) {
    this.itemForm = this.fb.group({
      tickets: [
        1,
        [Validators.required, Validators.min(1), Validators.max(data.tickets)],
      ],
    });
  }

  ngOnInit(): void {}

  closeModal(): void {
    this.dialogRef.close();
  }

  buyTickes(): void {
    if (this.itemForm.invalid) {
      return;
    }
    const newEventData = {
      id: this.data.id,
      tickets: this.data.tickets - this.itemForm.value.tickets,
    };
    const userData = {
      name: this.data.userName,
      event: {
        eventId: this.data.id,
        numTicket: this.itemForm.value.tickets,
      },
    };

    const pasarelaPago = this.dialog.open(CheckoutPageComponent, {
      data: {userName: userData.name, amount: this.itemForm.value.tickets*this.data.price, newEventData, userData},
      panelClass: 'modal-class',
      width: '720px',
      maxHeight: "80vh",
      disableClose: true,
    });
    this.dialogRef.close()

  }
}
