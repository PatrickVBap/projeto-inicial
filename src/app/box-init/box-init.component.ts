import { TranfererService } from './../tranferer.service';
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
    console.log(this.maximaData);
    console.log(this.currentDate);
    console.log(typeof this.maximaData);
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
      this._router.navigate(['chart-energy'], {queryParams: {dataDeInicio: this.initialDate, dataDeFim: this.finalDate, diasDaSemana: this.diasDaSemana, numeroDeDias: this.numeroDeDias}});
    }

    this.atribuiData(this.dataInicio);
  }

  atribuiData(date: any){
    this.diasDaSemana = [];
    this.numeroDeDias = Math.floor((this.currentDate.getTime() - this.dataInicio.value.getTime())/(1000*60*60*24));
    console.log(this.numeroDeDias);

    console.log(this.dataInicio.value);
    if(this.dataInicio.value != null && this.dataInicio.value != ''){
      this.initialDate = this.dataInicio.value.getDate() + '/' + (this.dataInicio.value.getMonth() + 1) + '/' + this.dataInicio.value.getFullYear();

      console.log(this.dataInicio)
      
      for(let i = 0; i < this.numeroDeDias; i++){
        this.diasDaSemana.push(new Date(this.dataInicio.value.getFullYear(), this.dataInicio.value.getMonth(), this.dataInicio.value.getDate() + i).getDay());
      }
      
      if(this.numeroDeDias < 7){
        this.dataFinal = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, this.currentDate.getDate() - 1);
      } else {
        this.dataFinal = new Date(this.dataInicio.value.getFullYear(), this.dataInicio.value.getMonth(), this.dataInicio.value.getDate() + 6);
      }
      
      this.finalDate = this.dataFinal.getDate() + '/' + (this.dataFinal.getMonth() + 1) + '/' + this.dataFinal.getFullYear();
    }
  }

  atribuiDados(evento: KeyboardEvent){
    this.nomeEmpresa = (<HTMLInputElement>evento.target).value;   

    this.transfereService.setData(this.nomeEmpresa);
    console.log(this.nomeEmpresa);  
  }
}