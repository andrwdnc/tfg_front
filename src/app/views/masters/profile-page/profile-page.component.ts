import { Component, OnInit } from '@angular/core';
import { ChildActivationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewTicketsComponent } from './view-tickets/view-tickets.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  public name: any;
  public mail: any;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const data = JSON.parse(localStorage.getItem('session') ?? '');
    this.name = atob(data.name);
    this.mail = atob(data.mail);
  }

  cerrarSesion(): void {
    this._snackBar.open('Sesion cerrada con exito.', '', { duration: 3000 });
    localStorage.removeItem('session');
    localStorage.removeItem("token")
    this.router.navigate(['/']);
  }

  openModalEvents(): void {
    this.dialog.open(ViewTicketsComponent, {
      panelClass: 'modal-class',
      width: '720px',
      maxHeight: '70vh',
      disableClose: true,
    });
  }

  openModalPass(): void {
    this.dialog.open(ChangePasswordComponent, {
      panelClass: 'modal-class',
      width: '720px',
      disableClose: true,
    });
  }
}
