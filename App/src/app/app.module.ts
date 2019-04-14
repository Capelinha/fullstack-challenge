import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListaPessoasComponent } from './lista-pessoas/lista-pessoas.component';
import { CadastroPessoasComponent } from './cadastro-pessoas/cadastro-pessoas.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaPessoasComponent,
    CadastroPessoasComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
