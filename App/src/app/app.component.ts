import {Component, EventEmitter, OnInit} from '@angular/core';
import {PessoaModel} from './models/pessoa.model';
import {FormBuilder} from '@angular/forms';
import {PessoaService} from './services/pessoa.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Desafio';
  pessoas: PessoaModel[];

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {
    this.atualizar();
  }

  atualizar() {
    this.pessoaService.getAll()
      .pipe(take(1))
      .subscribe((pessoas) => {
        this.pessoas = pessoas;
      });
  }

  salvar(e) {
    this.pessoaService.save(e).subscribe((sucesso) => {
      if (sucesso) {
        this.atualizar();
      }
    });
  }
}
