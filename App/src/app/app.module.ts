import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListaPessoasComponent } from './views/lista-pessoas/lista-pessoas.component';
import { CadastroPessoasComponent } from './views/cadastro-pessoas/cadastro-pessoas.component';

import {PessoaService} from './services/pessoa.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    ListaPessoasComponent,
    CadastroPessoasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule

  ],
  providers: [PessoaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
