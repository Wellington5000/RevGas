import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public codigo_compensacao: number | undefined
  nome_instituicao: string | undefined
  dataBank: any
  SERVER_URL = 'http://localhost:3000'

  pesquisar(){
    //REQUISIÇÃO PARA LISTAR TODOS OS BANCOS
    if(this.codigo_compensacao == undefined && this.nome_instituicao == undefined){
      this.http.get(`${ this.SERVER_URL }/listagem_bancos`).subscribe((resultado) => {
        this.dataBank = resultado
      });
    }
    //REQUISIÇÃO PARA BUSCAR PELO CÓDIGO
    else if(this.codigo_compensacao != undefined && this.nome_instituicao == undefined){
      this.http.get(`${ this.SERVER_URL }/consultar_codigo/${this.codigo_compensacao}`).subscribe((resultado) => {
        this.dataBank = resultado
      });
      this.codigo_compensacao = undefined
    }
    //REQUISIÇÃO PARA BUSCAR PELO CÓDIGO E NOME
    else if(this.codigo_compensacao != undefined && this.nome_instituicao != undefined){
      this.http.get(`${ this.SERVER_URL }/consultar/${this.codigo_compensacao}/${this.nome_instituicao}`).subscribe((resultado) => {
        this.dataBank = resultado
      });
      this.codigo_compensacao = undefined
      this.nome_instituicao = undefined
    }
    //REQUISIÇÃO PARA BUSCAR PELO NOME
    else if(this.codigo_compensacao == undefined && this.nome_instituicao != undefined){
      this.http.get(`${ this.SERVER_URL }/consultar_nome/${this.nome_instituicao}`).subscribe((resultado) => {
        this.dataBank = resultado
      });
      this.nome_instituicao = undefined
    }
  }

  constructor(private http: HttpClient){ }
  displayedColumns = ['position', 'name'];
}
