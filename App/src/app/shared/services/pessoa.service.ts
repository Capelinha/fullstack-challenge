import {EventEmitter, Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {PessoaModel} from '../models/pessoa.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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

  save(pessoa: PessoaModel): Observable<boolean> {
    // Enviar a solicitação e verificar foi sucesso
    return this.http.post<boolean>(this.URL, JSON.stringify(pessoa), {observe: 'response'})
      .pipe(map((r) => r.status === 201));
  }
}
