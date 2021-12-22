import { Component } from '@angular/core';
import { BankServiceService } from '../services/bank-service.service';



/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  pesquisar(){
    this.bankService.getBank().subscribe((data) => {
      this.dataBank = data
      console.log(this.dataBank)
    })
  }

  dataBank: any
  constructor(private bankService: BankServiceService){ }

  displayedColumns = ['position', 'name'];
  
}
