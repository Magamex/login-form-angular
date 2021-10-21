import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";

import { FormularioMascotaComponent } from './formulario-mascota/formulario-mascota.component';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    FormularioMascotaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
