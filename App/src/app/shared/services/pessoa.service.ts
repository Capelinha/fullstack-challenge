import {EventEmitter, Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {PessoaModel} from '../models/pessoa.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private readonly URL: string = 'https://k92gnvpow4.execute-api.us-east-2.amazonaws.com/beta/pessoa';
  emitirAlteracao: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  getAll(): Observable<PessoaModel[]> {
    return this.http.get<PessoaModel[]>(this.URL);
  }

  save(pessoa: PessoaModel) {
    // Enviar a solicitação e verificar foi sucesso, então emitir um evento
    return this.http.post(this.URL, JSON.stringify(pessoa), {observe: 'response'}).subscribe((response) => {
      if (response.status === 201) {
        this.emitirAlteracao.emit(true);
      } else {
        this.emitirAlteracao.emit(false);
      }
    });
  }
}
