import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {PessoaModel} from '../shared/models/pessoa.model';
import {Chart} from 'chart.js';
import {take} from 'rxjs/operators';
import {PessoaService} from '../shared/services/pessoa.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-lista-pessoas',
  templateUrl: './lista-pessoas.component.html',
  styleUrls: ['./lista-pessoas.component.css']
})
export class ListaPessoasComponent implements OnInit, OnDestroy {

  @ViewChild('grafico')
  elGrafico: ElementRef;
  grafico: Chart;
  pessoas: PessoaModel[];
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
        this.pessoas =  e ;

        const i = setInterval(() => {
          if (this.elGrafico != null && this.pessoas != null) {
            clearInterval(i);
            this.criarGrafico();
          }
        }, 100);

      });
  }

  criarGrafico() {
    if (this.grafico != null) {
      this.grafico.destroy();
    }

    const dados = {
      datasets: [{
        data : this.pessoas.map((pessoa) => pessoa.participacao),
        backgroundColor: this.pessoas.map( () => this.getRandomColor())
      }],
      labels: this.pessoas.map((pessoa) => `${pessoa.nome} ${pessoa.sobrenome}`),
      type: 'pie'
    };

    const opcoes = {
      aspectRatio : 1.7,
      maintainAspectRatio : true,
      onResize : (chart, size) => {
        if (window.innerWidth < 1000) {
          chart.config.options.legend.position = 'top';
          chart.config.options.maintainAspectRatio = false;
          chart.update();
        } else {
          chart.config.options.legend.position = 'right';
          chart.config.options.maintainAspectRatio = true;
          chart.update();
        }
      },
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

    if (dados.labels.length > 10 || window.innerWidth < 750) {
      opcoes.legend.position = 'top';
      opcoes.maintainAspectRatio = false;
    }

    const ctx = this.elGrafico.nativeElement.getContext('2d');

    this.grafico = new Chart(ctx, {
      type: 'doughnut',
      data: dados,
      options: opcoes
    });

    this.grafico.canvas.parentNode.style.height = '450px';

  }

  getRandomColor() {
    const letters = '456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
      color += letters[Math.round(Math.random() * (letters.length - 1))];
    }
    return color;
  }

}
