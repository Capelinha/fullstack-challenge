import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PessoaModel} from "../shared/models/pessoa.model";

import {Chart} from 'chart.js';
import {delay} from "q";

@Component({
  selector: 'lista-pessoas',
  templateUrl: './lista-pessoas.component.html',
  styleUrls: ['./lista-pessoas.component.css']
})
export class ListaPessoasComponent implements OnInit {

  //@ViewChild('grafico')
  elGrafico: ElementRef;
  grafico: Chart;
  pessoas: PessoaModel[] = [{id : "hhnOHFuhwhifhiIHFAW", nome : "Mateus", sobrenome : "Igreja", participacao : 10}];

  constructor() { }

  ngOnInit() {
  }

  //Disparar criação do grafico assim que o canvas for exibido na tela
  @ViewChild('grafico')
  set elementoGrafico(el: ElementRef) {
    this.elGrafico = el;
    this.criarGrafico();
  };

  criarGrafico() {
    const ctx = this.elGrafico.nativeElement.getContext('2d');

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
      legend: {
        position: 'right',
        labels: {
          fontSize : 14,
          fontStyle : 'bold',
          boxWidth : 14
        }
      },
      layout: {
        padding: {
          left: 5,
          right: 5,
          top: 10,
          bottom: 10
        }
      }
    };

    if (window.innerWidth < 550) {
      opcoes.legend.position = 'top';
      opcoes.aspectRatio = 1;
    }

    this.grafico = new Chart(ctx, {
      type: 'doughnut',
      data: dados,
      options: opcoes
    });

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
