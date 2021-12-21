import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public titulo: string | undefined;

  constructor() { }

  ngOnInit() {
    this.titulo = 'Home'
  }

}
