import { Component, OnInit } from '@angular/core';
import {PessoaModel} from "../shared/models/pessoa.model";

@Component({
  selector: 'lista-pessoas',
  templateUrl: './lista-pessoas.component.html',
  styleUrls: ['./lista-pessoas.component.css']
})
export class ListaPessoasComponent implements OnInit {

  pessoas: PessoaModel[] = [{id : "hhnOHFuhwhifhiIHFAW", nome : "Mateus", sobrenome : "Igreja", participacao : 10}];

  constructor() { }

  ngOnInit() {
  }

}
