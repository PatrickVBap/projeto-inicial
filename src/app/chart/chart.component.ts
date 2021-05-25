import { IntegracaoService } from '../services/integracao.service';
import { IDia, Dia } from './../models/dia.model';
import { IDadosDia, DadosDia } from './../models/dados-dia.model';
import { Component, OnInit } from '@angular/core';
import { TranfererService } from '../services/tranferer.service';
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
  dataInicioString: string;
  dataFinalString: string;
  grafico: c3.ChartAPI;
  diasDaSemana = [];
  diasDaSemanaNum = [];
  nomeDiasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  //teste de integração
  dia: IDia = Dia.ofEmpty();
  dadosDoDia: IDadosDia = DadosDia.ofEmpty();
  datasEscolhidas = [];

  //Cálculo para o gráfico
  linhaMedia = [];
  dataDays = [];
  nums = [];
  maiorMedia: string;
  menorMedia: string;
  mediaGeral: string;
  colorMaiorMedia: string;
  colorMenorMedia: string;

  //Construtor
  constructor(private transfereService: TranfererService,
    private route: ActivatedRoute,
    private integracao: IntegracaoService) {
    console.log('chart works');
    this.titulo = this.transfereService.getNome();

    //Recebe Data - Query Params
    this.route.queryParams.subscribe(
      (queryParams: any) => {
        this.dataInicioString = queryParams['dataDeInicioString'];
        this.dataFinalString = queryParams['dataDeFimString'];
        this.diasDaSemanaNum = queryParams['diasDaSemana'];
        this.datasEscolhidas = queryParams['datasEscolhidas'];
      }
    );

    //Número de dados no eixo x
    for(let i = 0; i < 24; i++){
      this.nums.push(i)
    }
  }

  ngOnInit(): void {

    //Chama funcao que calcula dados e indicadores
    this.calculaData();

    //Gera gráfico
    this.grafico = c3.generate({
      bindto: '#chart',
      data: {
        columns: [],
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
              return Math.ceil(x.valueOf());
            }
          },
          padding: {
            left: 0,
            right: 0.2
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
  }

  //Calcula dados do gráfico
  calculaData(){
    //Geracao de linhas no grafico
    this.integracao.list().subscribe(dados => {
      let objetos = [];
      let medias = [];
      let linhaMedia = [];
      for(let i = 0; i < this.datasEscolhidas.length; i++){
        let dataArray = this.datasEscolhidas[i].split('/');
        let d = new Date(dataArray[2], dataArray[1]-1, dataArray[0]);
        let index =  dados.findIndex(obj => obj.dataNumber == (dataArray[0]+dataArray[1]+dataArray[2]));

        if(index !== -1){
          this.grafico.load({
            columns: [[this.nomeDiasDaSemana[d.getDay()], ...dados[index].dadosDoDia]]
          });

          objetos.push(dados[index]);
          medias.push(dados[index].mediaDoDia);
        }
      }

      //Linha media
      for(let i = 0; i < 24; i++){
        linhaMedia[i] = 0;
        for(let j = 0; j < objetos.length; j++){
          linhaMedia[i] = linhaMedia[i] + objetos[j].dadosDoDia[i];
        }
        linhaMedia[i] = linhaMedia[i]/objetos.length;
      }

      this.grafico.load({
        columns: [['Média', ...linhaMedia]],
        colors: {'Média': 'rgba(190, 178, 178, 1)'}
      });

      //Media geral 
      if(medias.length > 0){
        let soma = 0
        for(let i = 0; i < medias.length; i++){
          soma = soma + medias[i];
        }
        this.mediaGeral = (soma/medias.length).toFixed(2).toString();
      } else{
        this.mediaGeral = (0).toFixed(2).toString();
      }

      if(medias.length > 0){//Apenas para não dar erro "data from undefined"
        //Maior media
        let dataArray1 = dados[dados.findIndex(obj => obj.mediaDoDia == medias[medias.indexOf(Math.max(...medias))])].data.split('/');
        let d1 = new Date(dataArray1[2], dataArray1[1]-1, dataArray1[0]);
        this.maiorMedia = this.nomeDiasDaSemana[d1.getDay()];

        //Menor media
        let dataArray2 = dados[dados.findIndex(obj => obj.mediaDoDia == medias[medias.indexOf(Math.min(...medias))])].data.split('/');
        let d2 = new Date(dataArray2[2], dataArray2[1]-1, dataArray2[0]);
        this.menorMedia = this.nomeDiasDaSemana[d2.getDay()];
      }

      //Cores dos indicadores
      let cores = ['rgba(0, 0, 255, 0.7)', 'rgba(255, 165, 0, 0.7)', 'rgba(0, 255, 0, 0.7)', 'rgba(255, 0, 0, 0.7)', 'rgba(153, 51, 153, 0.7)', 'rgba(150, 75, 0, 0.7)', 'rgba(255, 0, 127, 0.6)'];
      this.colorMaiorMedia = cores[medias.indexOf(Math.max(...medias))];
      this.colorMenorMedia = cores[medias.indexOf(Math.min(...medias))];
    });
  }
}