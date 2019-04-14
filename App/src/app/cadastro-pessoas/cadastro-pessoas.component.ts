import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PessoaService} from '../shared/services/pessoa.service';
import {PessoaModel} from '../shared/models/pessoa.model';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-cadastro-pessoas',
  templateUrl: './cadastro-pessoas.component.html',
  styleUrls: ['./cadastro-pessoas.component.css']
})
export class CadastroPessoasComponent implements OnInit {

  formCadastro: FormGroup;

  constructor(private fb: FormBuilder, private pessoaService: PessoaService) { }

  ngOnInit() {
    this.criarForm();
  }

  criarForm() {
    this.formCadastro = this.fb.group({
      nome : ['', Validators.required],
      sobrenome : ['', Validators.required],
      participacao : ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  validarCampo(campo: string) {
    if (this.formCadastro.controls[campo].touched || this.formCadastro.controls[campo].dirty ) {
      if (this.formCadastro.controls[campo].invalid) {
        return 'is-invalid';
      }
      return 'is-valid';
    }
  }

  cadastrar() {
    // Forçar validação dos campos
    Object.keys(this.formCadastro.controls).forEach(key => {
      this.formCadastro.get(key).markAsDirty();
    });

    if (this.formCadastro.valid) {
      this.pessoaService.save(this.formCadastro.value);

      // Se a insersão for sucesso, recriar form limpo
      this.pessoaService.emitirAlteracao.pipe(take(1)).subscribe((e) => {
        if (e) {
          this.criarForm();
        }
      });
    }
  }

}
