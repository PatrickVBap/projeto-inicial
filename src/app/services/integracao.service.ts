import { IDia } from './../models/dia.model';
import { IDadosDia } from './../models/dados-dia.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntegracaoService {

  dadosDia: IDadosDia;

  private readonly API = 'http://localhost:6060/api/dados';

  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<IDadosDia[]>(this.API);
  }

  create(dia: IDia){    
    return this.http.post(this.API, dia).toPromise().then( (dados: any) => {
      console.log(dados);
    });
  }

  getByDate(dia: IDia): Observable<IDadosDia>{
    let dataString = dia.data.toString();
    let dataArray = dataString.split('/');
    dataString = (dataArray[0] + dataArray[1] + dataArray[2]).toString();
    console.log(this.API + '/' + dataString);

    return this.http.get<IDadosDia>(this.API + '/' + dataString);
  }

}