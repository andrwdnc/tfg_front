import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationUtils } from 'src/app/shared/utils/validation-utils';
import { MatSnackBar } from '@angular/material/snack-bar';


interface MyData {
  resultado: {
    name: string;
    email: string;
    pass: string;
    type: string;
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public itemForm: FormGroup;
  public submitted = false;
  public user: any;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.itemForm = this.fb.group(
      {
        user: ['', [Validators.required]],
        mail: ['', [Validators.required, Validators.email]],
        pass: ['', [Validators.required, Validators.minLength(8)]],
        passR: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: ValidationUtils.MustMatch('pass', 'passR'),
      }
    );
  }

  ngOnInit(): void {}

  get f() {
    return this.itemForm.controls;
  }

  submit(): void {
    this.submitted = true;
    if (this.itemForm.invalid) {
      return;
    }
    const formValues = this.itemForm.value;
    const user = {
      name: formValues.user,
      email: formValues.mail,
      pass: formValues.pass,
      type: 'User',
    };
    this.http
      .post<MyData>('http://localhost:3000/api/v1/usuarios/', user)
      .subscribe(
        (data: MyData) => {
          if (data.resultado != undefined) {
            localStorage.setItem(
              'session',
              JSON.stringify({
                name: btoa(data.resultado.name),
                mail: btoa(data.resultado.email),
                type: btoa(data.resultado.type),
              })
            );
            this._snackBar.open("Registrado con exito ,sesion iniciada.","", { duration: 3000 })
            this.router.navigate(['/']);
          }
        },
        (error) => {
          this._snackBar.open("Error", error.error.error,{duration: 3000});

        }
      );
  }
}
