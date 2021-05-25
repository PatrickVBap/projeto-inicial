import { TranfererService } from '../services/tranferer.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-box-init',
  templateUrl: './box-init.component.html',
  styleUrls: ['./box-init.component.css']
})
export class BoxInitComponent implements OnInit, OnChanges {

  nomeEmpresa: string = 'GarfSoft';
  dataInicio = new FormControl('');
  dataFinal;
  diasDaSemana = [];
  datasEscolhidas= [];
  numeroDeDias: number;
  botaoPressionado: boolean;
  currentDate = new Date();
  maximaData = new Date(this.currentDate.getFullYear() - 0, this.currentDate.getMonth() - 0, this.currentDate.getDate() - 1);
  initialDate: string;
  finalDate: string;
  
  constructor(
    private transfereService: TranfererService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.botaoPressionado = false;
  }

  ngOnChanges(){
  }

  apertouBotao(){
    if(this.nomeEmpresa !== ''){
      if(this.dataInicio.value == '' || this.dataInicio.value == null){
        alert('Data não conhecida');
      } else{
        this.botaoPressionado = true;
      }
    } else{
      alert('Insira um título!');
    }

    if(this.botaoPressionado){
      this._router.navigate(['chart-energy'], {queryParams: {dataDeInicioString: this.initialDate, 
        dataDeFimString: this.finalDate, 
        diasDaSemana: this.diasDaSemana,
        datasEscolhidas: this.datasEscolhidas
      }});
      this.atribuiData(this.dataInicio);
    }

  }

  atribuiData(date: any){
    this.diasDaSemana = [];
    this.numeroDeDias = Math.floor((this.currentDate.getTime() - this.dataInicio.value.getTime())/(1000*60*60*24));

    if(this.dataInicio.value != null && this.dataInicio.value != ''){
      this.initialDate = this.dataInicio.value.getDate() + '/' + (this.dataInicio.value.getMonth() + 1) + '/' + this.dataInicio.value.getFullYear();
      
      for(let i = 0; i < this.numeroDeDias; i++){
        this.diasDaSemana.push(new Date(this.dataInicio.value.getFullYear(), this.dataInicio.value.getMonth(), this.dataInicio.value.getDate() + i).getDay());
      }
      
      if(this.numeroDeDias < 7){
        this.dataFinal = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - 1);
      } else {
        this.dataFinal = new Date(this.dataInicio.value.getFullYear(), this.dataInicio.value.getMonth(), this.dataInicio.value.getDate() + 6);
      }
      
      this.finalDate = this.dataFinal.getDate() + '/' + (this.dataFinal.getMonth() + 1) + '/' + this.dataFinal.getFullYear();
    }

    this.datasEscolhidas = [];
    let dataAux = new Date(this.dataInicio.value.getFullYear(), this.dataInicio.value.getMonth(), this.dataInicio.value.getDate())
    for(let i = 0; i < 7; i++){
      if(dataAux.getDate() == this.currentDate.getDate()){
        break;
      }

      if(dataAux.getMonth() + 1 > 10){
        this.datasEscolhidas[i] = dataAux.getDate() + '/' + (dataAux.getMonth() + 1) + '/' + dataAux.getFullYear();
      } else{
        this.datasEscolhidas[i] = dataAux.getDate() + '/0' + (dataAux.getMonth() + 1) + '/' + dataAux.getFullYear();
      }

      dataAux = new Date(dataAux.getFullYear(), dataAux.getMonth(), dataAux.getDate() + 1);
    }
  }

  atribuiDados(evento: KeyboardEvent){
    this.nomeEmpresa = (<HTMLInputElement>evento.target).value;   

    this.transfereService.setData(this.nomeEmpresa);
    console.log(this.nomeEmpresa);  
  }
}