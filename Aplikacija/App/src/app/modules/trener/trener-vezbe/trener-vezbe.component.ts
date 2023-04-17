import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Vezba } from 'src/app/models/vezba';
import { TrenerService } from 'src/app/services/trener.service';
import { VezbeService } from 'src/app/services/vezbe.service';
import { ModalService } from 'src/app/shared/_modal';

@Component({
  selector: 'app-trener-vezbe',
  templateUrl: './trener-vezbe.component.html',
  styleUrls: ['./trener-vezbe.component.css']
})
export class TrenerVezbeComponent implements OnInit {

  constructor(public modalService:ModalService, private toastrService:ToastrService, private trenerService:TrenerService) { }

  ngOnInit(): void {
  }

  misicneGrupe=[
    "Grudi",
    "Ramena",
    "Kvadricepsi",
    "Trbušnjaci",
    "Gluteus",
    "Zadnja loža",
    "Listovi",
    "Leđa",
    "Bicepsi",
    "Tricepsi"
  ]

  vezba:Vezba={};

  dodajVezbu(){
    console.log(this.vezba);
    this.trenerService.napraviVezbu(this.vezba).subscribe(()=>{
      this.modalService.close('modal');
      this.toastrService.success("Vežba uspešno kreirana","Success");
    },()=>{
      this.toastrService.error("Greška pri kreiranju vežbe", "Error");
    })
  }
}
