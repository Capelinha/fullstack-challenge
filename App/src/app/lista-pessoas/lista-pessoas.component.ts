import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {PessoaModel} from '../shared/models/pessoa.model';
import {Chart, ChartType} from 'chart.js';
import {take} from 'rxjs/operators';
import {PessoaService} from '../shared/services/pessoa.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-lista-pessoas',
  templateUrl: './lista-pessoas.component.html',
  styleUrls: ['./lista-pessoas.component.css']
})
export class ListaPessoasComponent implements OnInit, OnDestroy {
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
  // Evento cadastro
  inscAlteracao: Subscription;

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {
    this.obterDados();
    this.inscAlteracao = this.pessoaService.emitirAlteracao.subscribe((e) => this.obterDados());
  }

  ngOnDestroy() {
    this.inscAlteracao.unsubscribe();
  }

  obterDados() {
    this.pessoaService.getAll()
      .pipe(take(1))
      .subscribe((e) => {
        this.pessoas = e;
        this.labels = e.map((p) => p.nome);
        this.dados = e.map((p) => p.participacao);
      });
  }

  onHoverGrafico(e) {
    this.pessoaSelecionada = this.pessoas[e.active[0]._index].id;
  }

  onLeaveGrafico(e) {
    this.pessoaSelecionada = null;
  }
}
