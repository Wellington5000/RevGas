import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalNewBankComponent } from '../modal-new-bank/modal-new-bank.component';
import * as globais from '../../eventosGlobais'
/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  codigo_compensacao: number | undefined
  nome_instituicao: string | undefined
  dataBank: any
  displayedColumns = ['position', 'name', 'actions'];
  SERVER_URL = 'https://revgas-test.herokuapp.com/'

  pesquisar() {
    //REQUISIÇÃO PARA LISTAR TODOS OS BANCOS
    if (this.codigo_compensacao == undefined && this.nome_instituicao == undefined) {
      this.http.get(`${this.SERVER_URL}/listagem_bancos`).subscribe((resultado) => {
        this.dataBank = resultado
      });
    }
    //REQUISIÇÃO PARA BUSCAR PELO CÓDIGO
    else if (this.codigo_compensacao != undefined && this.nome_instituicao == undefined) {
      this.http.get(`${this.SERVER_URL}/consultar_codigo/${this.codigo_compensacao}`).subscribe((resultado) => {
        this.dataBank = resultado
      });
      this.codigo_compensacao = undefined
    }
    //REQUISIÇÃO PARA BUSCAR PELO CÓDIGO E NOME
    else if (this.codigo_compensacao != undefined && this.nome_instituicao != undefined) {
      this.http.get(`${this.SERVER_URL}/consultar/${this.codigo_compensacao}/${this.nome_instituicao}`).subscribe((resultado) => {
        this.dataBank = resultado
      });
      this.codigo_compensacao = undefined
      this.nome_instituicao = undefined
    }
    //REQUISIÇÃO PARA BUSCAR PELO NOME
    else if (this.codigo_compensacao == undefined && this.nome_instituicao != undefined) {
      this.http.get(`${this.SERVER_URL}/consultar_nome/${this.nome_instituicao}`).subscribe((resultado) => {
        this.dataBank = resultado
      });
      this.nome_instituicao = undefined
    }
  }

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  novoBanco() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.data = { codigo_compensacao: '', nome_instituicao: '', salvar: true }
    dialogConfig.autoFocus = true
    this.dialog.open(ModalNewBankComponent, dialogConfig)
  }

  editarBanco(elemento: any) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.data = { codigo_compensacao: elemento.codigo_compensacao, nome_instituicao: elemento.nome_instituicao, salvar: false }
    dialogConfig.autoFocus = true
    this.dialog.open(ModalNewBankComponent, dialogConfig)
  }

  refreshEvento: any = null;

  ngOnInit() {
    this.refreshEvento = globais.EventEmitterService.get('refreshProdutos').subscribe(e => this.pesquisar());
  }
}
