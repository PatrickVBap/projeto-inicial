import { templateJitUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TranfererService {

  constructor() { }

  private nome = 'Garfsoft';

  setData(nome){
    this.nome = nome;
    console.log('setData working');
  }

  getNome(){
    let temp = this.nome;

    this.clearNome();
    console.log('getNome working');
    return temp;
  }

  clearNome(){
    this.nome = 'Garfsoft';
    console.log('clearData working')
  }
}
