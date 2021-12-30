import { HttpClient, JsonpClientBackend } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'modal-new-bank',
    templateUrl: '../modal-new-bank/modal-new-bank.component.html',
    styleUrls: ['../modal-new-bank/modal-new-bank.component.css']
})
export class ModalNewBankComponent implements OnInit {
    codigo_compensacao: number | undefined
    nome_instituicao: string | undefined
    SERVER_URL = 'http://localhost:3000'
    form!: FormGroup;

    save() {
        console.log(this.codigo_compensacao, this.nome_instituicao)
        this.http.post(`${this.SERVER_URL}/salvar`, {codigo_compensacao: this.codigo_compensacao, nome_instituicao: this.nome_instituicao}).subscribe((resultado) => {
            console.log(resultado)
        })
        this.dialogRef.close();
    }

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<ModalNewBankComponent>,
        private http: HttpClient
        ) { }

    ngOnInit() { }

    

    close() {
        this.dialogRef.close();
    }
}
