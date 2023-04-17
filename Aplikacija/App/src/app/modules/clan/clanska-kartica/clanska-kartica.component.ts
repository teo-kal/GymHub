import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clanska-kartica',
  templateUrl: './clanska-kartica.component.html',
  styleUrls: ['./clanska-kartica.component.css']
})
export class ClanskaKarticaComponent implements OnInit {

  clan={
    ime:"Petar",
    prezime: "Milisavljevic",
    id:"#C0001",
    datumOd:"06/03/2021",
    datumDo:"06/04/2021"
  }

  constructor() { }

  ngOnInit(): void {
    this.ucitajClanskuKarticu();
  }

  ucitajClanskuKarticu(){ //getUser
    return this.clan;
  }
}
