import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HeaderMasterComponent } from './shared/components/header-master/header-master.component';
import { FooterMasterComponent } from './shared/components/footer-master/footer-master.component';
import { MainPageComponent } from './views/masters/main-page/main-page.component';
import { EventsPageComponent } from './views/masters/events-page/events-page.component';
import { MatIconModule } from "@angular/material/icon"
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider';
import { ContactPageComponent } from './views/masters/contact-page/contact-page.component';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EventModalComponent } from './views/masters/events-page/event-modal/event-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfilePageComponent } from './views/masters/profile-page/profile-page.component';
import { ChangePasswordComponent } from './views/masters/profile-page/change-password/change-password.component';
import { ViewTicketsComponent } from './views/masters/profile-page/view-tickets/view-tickets.component';
import { LoginComponent } from './views/masters/login/login.component';
import { RegisterComponent } from './views/masters/login/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CheckoutPageComponent } from './views/masters/events-page/checkout-page/checkout-page.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { AuthInterceptor } from './shared/utils/auth.interceptor';
import { MatMenuModule } from '@angular/material/menu';
import { PanelAdminComponent } from './views/masters/profile-page/panel-admin/panel-admin.component';
import { CreateEventComponent } from './views/masters/profile-page/panel-admin/create-event/create-event.component';
import { EditDeleteEventComponent } from './views/masters/profile-page/panel-admin/edit-delete-event/edit-delete-event.component';
import { ConfirmDeleteComponent } from './views/masters/profile-page/panel-admin/edit-delete-event/confirm-delete/confirm-delete.component'








@NgModule({
  declarations: [
    AppComponent,
    HeaderMasterComponent,
    FooterMasterComponent,
    MainPageComponent,
    EventsPageComponent,
    ContactPageComponent,
    EventModalComponent,
    ProfilePageComponent,
    ChangePasswordComponent,
    ViewTicketsComponent,
    LoginComponent,
    RegisterComponent,
    CheckoutPageComponent,
    PanelAdminComponent,
    CreateEventComponent,
    EditDeleteEventComponent,
    ConfirmDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    NgxQRCodeModule,
    MatMenuModule,
    FormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
