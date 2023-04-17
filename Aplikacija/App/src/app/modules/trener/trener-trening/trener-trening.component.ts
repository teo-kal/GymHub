import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/_modal';
import { _MAT_INK_BAR_POSITIONER_FACTORY } from '@angular/material/tabs/ink-bar';
import { PlanTreninga } from 'src/app/models/plan_treninga';
import { Observable, of, Subscription } from 'rxjs';
import { TrenerService } from 'src/app/services/trener.service';
import { Vezba } from 'src/app/models/vezba';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trener-trening',
  templateUrl: './trener-trening.component.html',
  styleUrls: ['./trener-trening.component.css'],
})
export class TrenerTreningComponent implements OnInit, OnDestroy {
  constructor(
    public modalService: ModalService,
    private trenerService: TrenerService,
    private toastrService:ToastrService
  ) {}

  misicneGrupe = [
    'Grudi',
    'Ramena',
    'Tricepsi',
    'Bicepsi',
    'Kvadricepsi',
    'Zadnja loža',
    'Leđa',
    'Gluteus',
    'Listovi',
    'Trbušnjaci',
  ];

  nivoi = [
    "Napredni",
    "Srednji",
    "Pocetni"
  ]
  vezbe: any;
  matVezbi: any;
  planovi: any;
  sub: Subscription;
  ngOnInit(): void {
    this.load();
  }

  load(){
    this.sub = this.trenerService
      .getMePlanoviTreninga(+localStorage.getItem('korisnikID'))
      .subscribe((planovi) => {
        this.planovi = planovi;
      });
  }

  ucitajMisicnuGrupu(grupa) {
    console.log(grupa);
    let pom: string;
    switch (grupa) {
      case 'Leđa': {
        pom = 'back';
        break;
      }
      case 'Gluteus': {
        pom = 'glutes';
        break;
      }
      case 'Grudi': {
        pom = 'pecks';
        break;
      }
      case 'Tricepsi': {
        pom = 'triceps';
        break;
      }
      case 'Kvadricepsi': {
        pom = 'quads';
        break;
      }
      case 'Listovi': {
        pom = 'calves';
        break;
      }
      case 'Ramena': {
        pom = 'shoulders';
        break;
      }
      case 'Trbušnjaci': {
        pom = 'obliques';
        break;
      }
      case 'Zadnja loža': {
        pom = 'hamstrings';
        break;
      }
      case 'Bicepsi': {
        pom = 'biceps';
        break;
      }
    }
    setTimeout(() => {
      this.trenerService.getVezbaByGroup(pom).subscribe((vezbe) => {
        this.vezbe = vezbe;
      });
    });
  }

  planZaPrikazivanje: any;
  nazivPlana: string;

  prikaziDetalje(selectedPlan) {
    this.sub = this.trenerService
      .getMeVezbeZaPlanTreninga(selectedPlan.ID)
      .subscribe((plan) => {
        this.planZaPrikazivanje = plan;
        this.planZaPrikazivanje.ID = selectedPlan.ID;
        console.log(this.planZaPrikazivanje);
        this.nazivPlana = selectedPlan.Naziv;
        setTimeout(() => {
          this.modalService.open('modal-Detalji');
        });
      });
  }
  planTreninga: PlanTreninga | null = null;

  ponedeljak = [];
  utorak = [];
  sreda = [];
  cetvrtak = [];
  petak = [];
  subota = [];
  nedelja = [];

  noviPlanTreninga = {
    TrenerID: +localStorage.getItem('korisnikID'),
    Naziv: '',
    Trajanje: 0,
    Nivo: '',
  };

  selectedTab = 0; //default ponedeljak

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedTab = tabChangeEvent.index;
  }

  private guid() {
    let uniqueId = Math.random().toString(36).substring(2) 
       + (new Date()).getTime().toString(36);
    return uniqueId;
}

  dodajUListu(vezba, tab) {
    console.log(this.ponedeljak);
    switch (tab) {
      case 0: {
        if (this.ponedeljak.findIndex((v) => v.Naziv === vezba.Naziv) == -1) {
          let objekat = {
            ...vezba,
            name:this.guid(),
            BrSerija: 0,
            BrPonavljanja: 0,
            Dani: 'PON',
          };
          this.ponedeljak.push(objekat);
        }
        break;
      }
      case 1: {
        if (this.utorak.findIndex((v) => v.Naziv === vezba.Naziv) == -1) {
          let objekat = {
            ...vezba,
            name:this.guid(),
            BrSerija: 0,
            BrPonavljanja: 0,
            Dani: 'UTO',
          };
          this.utorak.push(objekat);
        }
        break;
      }
      case 2: {
        if (this.sreda.findIndex((v) => v.Naziv === vezba.Naziv) == -1) {
          let objekat = {
            ...vezba,
            name:this.guid(),
            BrSerija: 0,
            BrPonavljanja: 0,
            Dani: 'SRE',
          };
          this.sreda.push(objekat);
        }
        break;
      }
      case 3: {
        if (this.cetvrtak.findIndex((v) => v.Naziv === vezba.Naziv) == -1) {
          let objekat = {
            ...vezba,
            name:this.guid(),
            BrSerija: 0,
            BrPonavljanja: 0,
            Dani: 'ČET',
          };
          this.cetvrtak.push(objekat);
        }
        break;
      }
      case 4: {
        if (this.petak.findIndex((v) => v.Naziv === vezba.Naziv) == -1) {
          let objekat = {
            ...vezba,
            name:this.guid(),
            BrSerija: 0,
            BrPonavljanja: 0,
            Dani: 'PET',
          };

          this.petak.push(objekat);
        }
        break;
      }
      case 5: {
        if (this.subota.findIndex((v) => v.Naziv === vezba.Naziv) == -1) {
          let objekat = {
            ...vezba,
            name:this.guid(),
            BrSerija: 0,
            BrPonavljanja: 0,
            Dani: 'SUB',
          };

          this.subota.push(objekat);
        }
        break;
      }
      case 6: {
        if (this.nedelja.findIndex((v) => v.Naziv === vezba.Naziv) == -1) {
          let objekat = {
            ...vezba,
            name:this.guid(),
            BrSerija: 0,
            BrPonavljanja: 0,
            Dani: 'NED',
          };
          this.nedelja.push(objekat);
        }
        break;
      }
      default:
        break;
    }
  }

  izbaciIzListe(vezba, selectedTab) {
    switch (selectedTab) {
      case 0: {
        console.log(vezba.Naziv);
        let indx = this.ponedeljak.indexOf(vezba,0);
        this.ponedeljak.splice(indx, 1);
        break;
      }
      case 1: {
        let indx = this.utorak.indexOf(vezba,0);
        this.utorak.splice(indx, 1);
        break;
      }
      case 2: {
        let indx = this.sreda.indexOf(vezba,0);
        this.sreda.splice(indx, 1);
        break;
      }
      case 3: {
        let indx = this.cetvrtak.indexOf(vezba,0);
        this.cetvrtak.splice(indx, 1);
        break;
      }
      case 4: {
        let indx = this.petak.indexOf(vezba,0);
        this.petak.splice(indx, 1);
        break;
      }
      case 5: {
        let indx = this.subota.indexOf(vezba,0);
        this.subota.splice(indx, 1);
        break;
      }
      case 6: {
        let indx = this.nedelja.indexOf(vezba,0);
        this.nedelja.splice(indx, 1);
        break;
      }
      default:
        break;
    }
  }

  submit() {
    let objekatZaSlanje;
    let vezbeZaSlanje = [];
    this.ponedeljak.forEach((vezba) => {
      vezbeZaSlanje.push(vezba);
    });
    this.utorak.forEach((vezba) => {
      let indx = vezbeZaSlanje.findIndex((v) => v.Naziv === vezba.Naziv);
      if (indx == -1) {
        vezbeZaSlanje.push(vezba);
      } else {
        vezbeZaSlanje[indx].Dani += ';UTO';
      }
    });
    this.sreda.forEach((vezba) => {
      let indx = vezbeZaSlanje.findIndex((v) => v.Naziv === vezba.Naziv);
      if (indx == -1) {
        vezbeZaSlanje.push(vezba);
      } else {
        vezbeZaSlanje[indx].Dani += ';SRE';
      }
    });
    this.cetvrtak.forEach((vezba) => {
      let indx = vezbeZaSlanje.findIndex((v) => v.Naziv === vezba.Naziv);
      if (indx == -1) {
        vezbeZaSlanje.push(vezba);
      } else {
        vezbeZaSlanje[indx].Dani += ';ČET';
      }
    });
    this.petak.forEach((vezba) => {
      let indx = vezbeZaSlanje.findIndex((v) => v.Naziv === vezba.Naziv);
      if (indx == -1) {
        vezbeZaSlanje.push(vezba);
      } else {
        vezbeZaSlanje[indx].Dani += ';PET';
      }
    });
    this.subota.forEach((vezba) => {
      let indx = vezbeZaSlanje.findIndex((v) => v.Naziv === vezba.Naziv);
      if (indx == -1) {
        vezbeZaSlanje.push(vezba);
      } else {
        vezbeZaSlanje[indx].Dani += ';SUB';
      }
    });
    this.nedelja.forEach((vezba) => {
      let indx = vezbeZaSlanje.findIndex((v) => v.Naziv === vezba.Naziv);
      if (indx == -1) {
        vezbeZaSlanje.push(vezba);
      } else {
        vezbeZaSlanje[indx].Dani += ';NED';
      }
    });
    let pomPlan = this.noviPlanTreninga
    objekatZaSlanje = {
      PlanTreninga:pomPlan,
      Vezbe:vezbeZaSlanje
    }
    console.log(objekatZaSlanje);
    this.trenerService.createPlanTreninga(objekatZaSlanje).subscribe(()=>{
      this.modalService.close("modal");
      this.toastrService.success("Plan napravjen","Success");
      setTimeout(()=>{
        this.load();
      })
    },(err)=>{
      this.toastrService.error(err,"Error");
    })
  }

  dodajNoviKlik() {
    this.modalService.open('modal');
  }

  clickObrisi = false;
  obrisiPlan(id:number){
    console.log(this.clickObrisi);
    if(!this.clickObrisi)
    {
      this.toastrService.info("Kliknite opet na kanticu kako bi potvrdili brisanje plana", "Info");
      this.clickObrisi = true;
    }
    else{
      this.trenerService.obrisiPlanTreninga(id).subscribe(()=>{
        this.toastrService.success("Uspešno ste obrisali plan","Success");
        this.zatvoriModalObrisi();
        this.load();
      })
      this.clickObrisi = false;
    }
  }
  zatvoriModalObrisi(){
    this.clickObrisi = false;
    this.modalService.close("modal-Detalji")
  }
  ngOnDestroy(): void {
    this.unsubscribe();
  }
  unsubscribe() {
    if (this.sub) this.sub.unsubscribe();
  }
}
