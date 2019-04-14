import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'cadastro-pessoas',
  templateUrl: './cadastro-pessoas.component.html',
  styleUrls: ['./cadastro-pessoas.component.css']
})
export class CadastroPessoasComponent implements OnInit {

  formCadastro: FormGroup;

  constructor(private fb: FormBuilder) { }

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

  validar(campo: string) {
    if (this.formCadastro.controls[campo].touched || this.formCadastro.controls[campo].dirty ) {
      if (this.formCadastro.controls[campo].invalid) {
        return 'is-invalid';
      } else {
        return 'is-valid';
      }
    }
  }

  cadastrar() {

  }

}
