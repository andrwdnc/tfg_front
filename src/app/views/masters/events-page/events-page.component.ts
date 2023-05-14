import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EventModalComponent } from './event-modal/event-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
})
export class EventsPageComponent implements OnInit {
  public myData: any;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.http.get('http://localhost:3000/api/v1/eventos/').subscribe((data) => {
      this.myData = data;
      this.myData = this.myData.eventos;
    });
  }

  openModal(
    id: string,
    price: number,
    name: string,
    date: string,
    tickets: number
  ): void {
    if (localStorage.getItem('session') === null) {
      this._snackBar.open(
        'Inicia sesion para poder gestionar tus entradas.',
        '',
        { duration: 3000 }
      );
      return;
    }
    const userData = JSON.parse(localStorage.getItem('session') ?? '');
    const entradas = this.dialog.open(EventModalComponent, {
      data: { id, price, name, date, tickets, userName: atob(userData.name) },
      panelClass: 'modal-class',
      width: '720px',
      disableClose: true,
    });


  }
}
