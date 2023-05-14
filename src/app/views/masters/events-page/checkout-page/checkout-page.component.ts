import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CheckoutPageComponent>,
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      cardNumber: ["", [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(16), Validators.maxLength(16)]],
      cardCvv: ["", [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(3), Validators.maxLength(3)]],
      cardExp: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
    });
  }


  initPay(): void {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.http
      .patch('http://localhost:3000/api/v1/usuarios/', this.data.userData)
      .subscribe(
        (data) => {

          this.http
            .patch(
              'http://localhost:3000/api/v1/eventos/' + this.data.newEventData.id,
              this.data.newEventData
            )
            .subscribe(
              (data) => {

                this.dialogRef.close(true);
                this.router.navigate(["/"])
                this._snackBar.open("Entradas compradas correctamente, revisa tu perfil de usuario para comprobarlo.","", { duration: 5000 });


              },
              (error) => {

                return;
              }
            );
        },
        (error) => {

          return;
        }
      );
    this.dialogRef.close(true)
    }, 2000);

  }
}

