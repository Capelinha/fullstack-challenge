import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {PessoaModel} from "../models/pessoa.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private readonly endpoint: string = "https://k92gnvpow4.execute-api.us-east-2.amazonaws.com/beta/pessoa";

  constructor(private http: HttpClient) { }

  getAll(): Observable<PessoaModel[]>{
    return this.http.get<PessoaModel[]>(this.endpoint);
  }

  save(pessoa: PessoaModel){
    return this.http.post(this.endpoint, JSON.stringify(pessoa));
  }
}
