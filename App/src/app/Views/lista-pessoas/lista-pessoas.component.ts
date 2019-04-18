import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';

import {PessoaModel} from '../../models/pessoa.model';
import {Chart, ChartType} from 'chart.js';
import {take} from 'rxjs/operators';
import {PessoaService} from '../../services/pessoa.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-lista-pessoas',
  templateUrl: './lista-pessoas.component.html',
  styleUrls: ['./lista-pessoas.component.css']
})

export class ListaPessoasComponent implements OnInit {
  // Pessoas
  pessoas: PessoaModel[];
  // Dados grafico
  labels: string[];
  dados: number[];
  // Tipo de grafico
  doughnutChartType: ChartType = 'doughnut';
  // Linha da tabela destacada
  pessoaSelecionada: string;
  // Opções do grafico
  opcoes = {
    aspectRatio : 1.7,
    maintainAspectRatio : true,
    legend: {
      position: 'right',
      margins : {
        bottom : 20
      },
      labels: {
        fontSize : 14,
        fontStyle : 'bold',
        boxWidth : 14
      }
    },
  };

  constructor() { }

  ngOnInit() {
  }

  @Input('pessoas')
  set setPessoas(value: PessoaModel[]) {
    if (value != null) {
      this.pessoas = value;
      this.labels = value.map((p) => p.nome);
      this.dados = value.map((p) => p.participacao);
    }
  }

  onHoverGrafico(e) {
    this.pessoaSelecionada = this.pessoas[e.active[0]._index].id;
    console.log(e);
  }

  onLeaveGrafico(e) {
    this.pessoaSelecionada = null;
    console.log(e);
  }

}
