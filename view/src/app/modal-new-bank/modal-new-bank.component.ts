import { HttpClient, JsonpClientBackend } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import * as globais from '../../eventosGlobais'

@Component({
    selector: 'modal-new-bank',
    templateUrl: '../modal-new-bank/modal-new-bank.component.html',
    styleUrls: ['../modal-new-bank/modal-new-bank.component.css']
})
export class ModalNewBankComponent implements OnInit {
    codigo_compensacao: number | undefined
    nome_instituicao: string | undefined
    SERVER_URL = 'https://revgas-test.herokuapp.com/'
    form!: FormGroup;

    salvar() {
        this.http.post(`${this.SERVER_URL}/salvar`, { codigo_compensacao: this.data.codigo_compensacao, nome_instituicao: this.data.nome_instituicao }).subscribe((resultado) => {
            console.log(resultado)
        })
        globais.EventEmitterService.get('refreshProdutos').emit(true);
        this.dialogRef.close();
    }

    atualizar() {
        this.http.post(`${this.SERVER_URL}/atualizar`, { codigo_compensacao: this.data.codigo_compensacao, nome_instituicao: this.data.nome_instituicao }).subscribe((resultado) => {
            console.log(resultado)
        })
        globais.EventEmitterService.get('refreshProdutos').emit(true);
        this.dialogRef.close();
    }

    deletar() {
        console.log('deletar')
        this.http.post(`${this.SERVER_URL}/deletar`, { codigo_compensacao: this.data.codigo_compensacao }).subscribe((resultado) => {
            console.log(resultado)
        })
        globais.EventEmitterService.get('refreshProdutos').emit(true);
        this.dialogRef.close();
    }

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<ModalNewBankComponent>,
        private http: HttpClient,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() { }

    close() {
        this.dialogRef.close();
    }
}
