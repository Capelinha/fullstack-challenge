import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PessoaService} from '../../services/pessoa.service';
import {PessoaModel} from '../../models/pessoa.model';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-cadastro-pessoas',
  templateUrl: './cadastro-pessoas.component.html',
  styleUrls: ['./cadastro-pessoas.component.css']
})
export class CadastroPessoasComponent implements OnInit, OnDestroy {

  formCadastro: FormGroup;
  @Output() salvarEvento: EventEmitter<PessoaModel> = new EventEmitter<PessoaModel>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.criarForm();
  }

  // Completar evento ao destruir o componente
  ngOnDestroy() {
    this.salvarEvento.complete();
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
      this.salvarEvento.emit(this.formCadastro.value);
      // Limpar form
      this.formCadastro.reset();
    }
  }

}
