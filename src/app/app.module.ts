import {BrowserModule} from "@angular/platform-browser";
import {LOCALE_ID, NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./Header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {DirectivaComponent} from "./directive/directiva.component";
import {ClientesComponent} from "./clientes/clientes.component";
import {PaginatorComponent} from "./paginator/paginator.component";
import {FormComponent} from "./clientes/form.component";
import {DetalleComponent} from "./clientes/detail/detalle.component";
import {LoginComponent} from "./users/login.component";
import {DetalleFacturaComponent} from "./facturas/detalle-factura.component";
import {FacturasComponent} from "./facturas/facturas.component";
import {ClienteService} from "./clientes/cliente.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {MatFormField} from "@angular/material/form-field";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {MatInput} from "@angular/material/input";
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatOption} from "@angular/material/core";

import {registerLocaleData} from "@angular/common";
import localeEs from "@angular/common/locales/es";


registerLocaleData(localeEs, "es");

import {RouterModule, Routes} from "@angular/router";
import {authGuard} from "./users/guards/auth.guard";
import {Forbidden403Component} from "./components/forbidden403/forbidden403.component";


const routes: Routes = [
  {path: "", redirectTo: "/clientes", pathMatch: "full"},
  {path: "directivas", component: DirectivaComponent},
  {path: "clientes", component: ClientesComponent},
  {path: "clientes/form", component: FormComponent, canActivate: [authGuard]},
  {path: "clientes/form/:id", component: FormComponent, canActivate: [authGuard]},
  {path: "clientes/page/:page", component: ClientesComponent},
  {path: "login", component: LoginComponent},
  {path: "forbidden", component: Forbidden403Component},
  {path: "facturas/:id", component: DetalleFacturaComponent},
  {path: "facturas/form/:clienteId", component: FacturasComponent}


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
    DetalleComponent,
    DetalleFacturaComponent,
    FacturasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatFormField,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatOption,
    MatInput,

  ],
  providers: [
    ClienteService,
    {provide: LOCALE_ID, useValue: "es"},
    {provide: MAT_DATE_LOCALE, useValue: "es-ES"},
    // Define el formato de fecha personalizado
    {
      provide: MAT_DATE_FORMATS, useValue: {
        parse: {
          dateInput: 'LL',
        },
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      }
    }
  ],
  exports: [
    HeaderComponent,
    [RouterModule]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
