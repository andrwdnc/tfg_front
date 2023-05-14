import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Event } from '../../../../shared/interfaces/event.interface';
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels
} from "@techiediaries/ngx-qrcode";

interface User {
  _id: string;
  name: string;
  email: string;
  pass: string;
  type: string;
  event: Eventox[];
}

interface Eventox {
  eventId: string,
  numTickets: number
}


@Component({
  selector: 'app-view-tickets',
  templateUrl: './view-tickets.component.html',
  styleUrls: ['./view-tickets.component.scss'],
})
export class ViewTicketsComponent implements OnInit {
  public events: Event[] = [];

  constructor(private http: HttpClient) {}

  tipoElemento = NgxQrcodeElementTypes.CANVAS;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  valor: string = "www.salaplay.com"

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('session') ?? '');
    this.http
      .get<User>('http://localhost:3000/api/v1/usuarios/' + atob(userData.name))
      .subscribe(
        (res) => {
          if (res) {
            res.event.forEach((e) => {
              this.http
                .get<Event>('http://localhost:3000/api/v1/eventos/' + e.eventId)
                .subscribe(
                  (res) => {
                    console.log(e.numTickets)
                    res.evento.tickets = e.numTickets
                    this.events.push(res)
                  },
                  (err) => {}
                );
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }


}
