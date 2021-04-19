import { Component, OnInit } from '@angular/core';
import { TranfererService } from './../tranferer.service';
import * as c3 from 'c3';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{
  
  //Geral
  titulo: string = 'Garfsoft';
  dataInicio;
  dataFinal;
  grafico;
  diasDaSemana = [];
  diasDaSemanaNum = [];
  numeroDeDias;

  //Cálculo para o gráfico
  linhaMedia = [];
  dataDays = [];
  nums = [];
  maiorMedia: string;
  menorMedia: string;
  mediaGeral: string;
  colorMaiorMedia: string;
  colorMenorMedia: string;

  constructor(private transfereService: TranfererService,
    private route: ActivatedRoute) {
    console.log('chart works');
    this.titulo = this.transfereService.getNome();

    //Recebe Data - Query Params
    this.route.queryParams.subscribe(
      (queryParams: any) => {
        this.dataInicio = queryParams['dataDeInicio'];
        this.dataFinal = queryParams['dataDeFim'];
        this.diasDaSemanaNum = queryParams['diasDaSemana'];
        this.numeroDeDias = queryParams['numeroDeDias'];
      }
    );

    console.log(this.diasDaSemanaNum);
    for(let i = 0; i < this.diasDaSemanaNum.length; i++){
      if(this.diasDaSemanaNum[0] == "0"){
        this.diasDaSemanaNum.splice(0, 1);
        this.diasDaSemanaNum.push("6");
      } else{
        let aux = Number(this.diasDaSemanaNum[0])
        this.diasDaSemanaNum.splice(0, 1);
        this.diasDaSemanaNum.push(String(aux-1));
      }
    }
    console.log(this.diasDaSemanaNum);    

    for(let i = 0; i < 97; i++){
      this.nums.push(i)
    }
  }

  ngOnInit(): void {
    this.calculaData();
    this.encontraMedias();

    this.grafico = c3.generate({
      bindto: '#chart',
      data: {
        x: 'x',
        columns: [
            ['Seg', ...this.dataDays[0]],
            ['Ter', ...this.dataDays[1]],
            ['Qua', ...this.dataDays[2]],
            ['Qui', ...this.dataDays[3]],
            ['Sex', ...this.dataDays[4]],
            ['Sáb', ...this.dataDays[5]],
            ['Dom', ...this.dataDays[6]],
            ['Média', ...this.linhaMedia],
            ['x', ...this.nums]
        ],

        colors:{
          Média: 'grey'
        },
      }, 

      axis: {
        x:{
          label:{
            text: 'Time (h)',
            position: 'outer-center',
          },
          tick:{
            count: 7,
            format: function(x){
              return 4*Math.floor(x.valueOf()/15.8333);
            }
          },
          padding: {
            left: 0
          }
        },

        y:{
          label:{
            text: 'Power (kW)',
            position: 'outer-middle'
          },
          max: 5.2,
          min: 2.5,
        }
      },

      point: {
        show: false
      },
    });

    this.grafico.unload({
      ids: [...this.diasDaSemana]
    });

    
  }

  calculaData(){
    for(let i = 0; i < 7; i++){
      let dadosBase = [];   
      let dados = [];
      let sum = 0;

      for(let i = 0; i < 7; i++){
        dadosBase.push(Math.random()*0.5 + 4);
      }

      for(let j = 0; j < 96; j++){
        sum = dados.push(dadosBase[i] - 0.13 + Math.random()*0.22)
      }

      this.dataDays.push(dados)
    }

    let sumMedia = 0;
    for(let i = 0; i < 96; i++){
      for(let j = 0; j < this.diasDaSemanaNum.length; j++){
        sumMedia += this.dataDays[Number(this.diasDaSemanaNum[j])][i];
      }
      this.linhaMedia.push(sumMedia/this.diasDaSemanaNum.length);
      sumMedia = 0;
    }

    //Verifica dias das semana
    if(this.diasDaSemanaNum.indexOf("0") == -1){
      this.diasDaSemana.push("Seg");
    }
    if(this.diasDaSemanaNum.indexOf("1") == -1){
      this.diasDaSemana.push("Ter");
    }
    if(this.diasDaSemanaNum.indexOf("2") == -1){
      this.diasDaSemana.push("Qua");
    }
    if(this.diasDaSemanaNum.indexOf("3") == -1){
      this.diasDaSemana.push("Qui");
    }
    if(this.diasDaSemanaNum.indexOf("4") == -1){
      this.diasDaSemana.push("Sex");
    }
    if(this.diasDaSemanaNum.indexOf("5") == -1){
      this.diasDaSemana.push("Sáb");
    }
    if(this.diasDaSemanaNum.indexOf("6") == -1){
      this.diasDaSemana.push("Dom");
    }
    
    console.log(this.diasDaSemana);
    

  }

  encontraMedias(){
    let semana = [];
    let diasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
    let cores = ['rgba(0, 0, 255, 0.7)', 'rgba(255, 165, 0, 0.7)', 'rgba(0, 255, 0, 0.7)', 'rgba(255, 0, 0, 0.7)', 'rgba(153, 51, 153, 0.7)', 'rgba(150, 75, 0, 0.7)', 'rgba(255, 0, 127, 0.6)'];
    let sum = 0;
    let sumMedia = 0;
    let maior;
    let menor;

    for(let i = 0; i < 7; i++){
      for(let j = 0; j < 96; j++){
        sum += this.dataDays[i][j];
      }

      semana.push(sum/96);
      sum = 0;
    }

    for(let i = 0; i < 96; i++){
      sumMedia += this.linhaMedia[i];
    }

    console.log(this.diasDaSemanaNum);
    let semanaVar = semana.slice(0);
    console.log(semanaVar);
    let aux = 0;
    while(aux == 0){
      if(this.diasDaSemanaNum.includes(String(semana.indexOf(Math.max(...semanaVar))))){
        maior = semana.indexOf(Math.max(...semanaVar));
        aux = 1;
      } else{
        semanaVar.splice(semanaVar.indexOf(Math.max(...semanaVar)), 1);
      }
    }

    semanaVar = [];
    semanaVar = semana.slice(0);
    aux = 0;
    while(aux == 0){
      if(this.diasDaSemanaNum.includes(String(semana.indexOf(Math.min(...semanaVar))))){
        menor = semana.indexOf(Math.min(...semanaVar));
        aux = 1;
      } else{
        semanaVar.splice(semanaVar.indexOf(Math.min(...semanaVar)), 1);
      }
    }

    this.maiorMedia = diasDaSemana[maior];
    this.menorMedia = diasDaSemana[menor];
    this.mediaGeral = (sumMedia/96).toFixed(2);

    this.colorMaiorMedia = cores[maior];
    this.colorMenorMedia = cores[menor];
  }
}