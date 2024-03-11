import {BrowserModule} from "@angular/platform-browser";
import {LOCALE_ID, NgModule} from "@angular/core";


import {AppComponent} from "./app.component";
import {HeaderComponent} from "./Header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {DirectivaComponent} from "./directiva/directiva.component";
import {ClientesComponent} from "./clientes/clientes.component";
import {PaginatorComponent} from "./paginator/paginator.component";
import {FormComponent} from "./clientes/form.component"
import {ClienteService} from "./clientes/cliente.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

import {registerLocaleData} from "@angular/common";
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es')


import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
    {path: '', redirectTo: '/clientes', pathMatch: 'full'},
    {path: 'directivas', component: DirectivaComponent},
    {path: 'clientes', component: ClientesComponent},
    {path: 'clientes/form', component: FormComponent},
    {path: 'clientes/form/:id', component: FormComponent},
    {path: 'clientes/page/:page', component: ClientesComponent},

];


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        DirectivaComponent,
        ClientesComponent,
        FormComponent,
        PaginatorComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(routes)
    ],
    providers: [ClienteService, {provide: LOCALE_ID, useValue: 'es'}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
