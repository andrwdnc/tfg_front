import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-header-master',
  templateUrl: './header-master.component.html',
  styleUrls: ['./header-master.component.scss'],
})
export class HeaderMasterComponent implements OnInit {
  public route: String = '/profile';
  public logged: boolean = true;
  public url: any;
  public isMenuOpen = false;


  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const currentUrl = this.router.url
    if (localStorage.getItem('session') === null) {
      this.route = '/login';
      this.logged = false;
    }
    if (currentUrl == "/"){
      this.url = "Cultura en directo"
    } else if (currentUrl == "/contact"){
      this.url = "Informacion de contacto"
    } else if (currentUrl == "/events"){
      this.url = "Proximos eventos"
    } else if (currentUrl == "/profile"){
      this.url = "Perfil de usuario"
    }
  }
}
