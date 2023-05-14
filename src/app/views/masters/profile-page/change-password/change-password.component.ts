import { Component, Inject } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';

import { ValidationUtils } from 'src/app/shared/utils/validation-utils';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  public itemForm: UntypedFormGroup;
  public submitted = false;
  public hide = true;
  public hide2 = true;
  public hide3 = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private fb: UntypedFormBuilder,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.itemForm = this.fb.group(
      {
        actualPass: ['', [Validators.required, Validators.minLength(8)]],
        new1Pass: ['', [Validators.required, Validators.minLength(8)]],
        new2Pass: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: ValidationUtils.MustMatch('new1Pass', 'new2Pass'),
      }
    );
  }

  get f() {
    return this.itemForm.controls;
  }

  ngOnInit(): void {}

  submit() {
    this.submitted = true;
    if (this.itemForm.invalid) {
      return;
    }
    const localData = JSON.parse(localStorage.getItem('session') ?? '');
    const formData = this.itemForm.value;
    const passData = {
      name: atob(localData.name),
      actualPass: formData.actualPass,
      newPass: formData.new1Pass,
    };
    this.http
      .post('http://localhost:3000/api/v1/usuarios/changePass', passData)
      .subscribe(
        (data) => {
          this.dialogRef.close(true);
          this._snackBar.open('Contraseña guardada correctamente.', '', {
            duration: 3000,
          });
        },
        (error) => {
          this._snackBar.open('Error', error.error.error, { duration: 3000 });
        }
      );
  }
}
