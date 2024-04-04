import { BrowserModule } from "@angular/platform-browser";
import { LOCALE_ID, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./Header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { DirectivaComponent } from "./directive/directiva.component";
import { ClientesComponent } from "./clientes/clientes.component";
import { PaginatorComponent } from "./paginator/paginator.component";
import { FormComponent } from "./clientes/form.component";
import { DetalleComponent } from "./clientes/detail/detalle.component";
import { ClienteService } from "./clientes/cliente.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";


import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";

import { registerLocaleData } from "@angular/common";
import localeEs from "@angular/common/locales/es";


registerLocaleData(localeEs, "es");

import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "/clientes", pathMatch: "full" },
  { path: "directivas", component: DirectivaComponent },
  { path: "clientes", component: ClientesComponent },
  { path: "clientes/form", component: FormComponent },
  { path: "clientes/form/:id", component: FormComponent },
  { path: "clientes/page/:page", component: ClientesComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [
    ClienteService,
    { provide: LOCALE_ID, useValue: "es" },
    { provide: MAT_DATE_LOCALE, useValue: "es-ES" },
    // Define el formato de fecha personalizado
    { provide: MAT_DATE_FORMATS, useValue: {
        parse: {
          dateInput: 'LL',
        },
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
