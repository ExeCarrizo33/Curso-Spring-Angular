import { NgModule } from "@angular/core";
import {BrowserModule, provideClientHydration} from "@angular/platform-browser";
import {HeaderModule} from "./header.module";


@NgModule({
  declarations:[

  ],
  imports:[
    BrowserModule,HeaderModule
  ],
  providers:[
    provideClientHydration()
  ],
  bootstrap: []

})

export class AppModule {}
