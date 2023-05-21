import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from "../app/views/masters/main-page/main-page.component"
import { ContactPageComponent } from './views/masters/contact-page/contact-page.component';
import { EventsPageComponent } from './views/masters/events-page/events-page.component';
import { AppComponent } from './app.component';
import { ProfilePageComponent } from './views/masters/profile-page/profile-page.component';
import { LoginComponent } from './views/masters/login/login.component';
import { RegisterComponent } from './views/masters/login/register/register.component';
import { AuthGuardLogged } from './shared/utils/authLogeed.guard';
import { AuthGuardUnlogged } from "./shared/utils/authUnlogged.guard";
import { PanelAdminComponent } from './views/masters/profile-page/panel-admin/panel-admin.component';
import { AuthGuardAdmin } from "./shared/utils/authAdmin.guard";

const routes: Routes = [
  {path: "", component: MainPageComponent},
  {path: "contact",component: ContactPageComponent},
  {path: "events",component: EventsPageComponent},
  {path: "profile",component: ProfilePageComponent, canActivate: [AuthGuardLogged]},
  {path: "login", component: LoginComponent,  canActivate: [AuthGuardUnlogged] },
  {path: "register", component: RegisterComponent,  canActivate: [AuthGuardUnlogged] },
  {path: "admin", component: PanelAdminComponent, canActivate:[AuthGuardAdmin]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
