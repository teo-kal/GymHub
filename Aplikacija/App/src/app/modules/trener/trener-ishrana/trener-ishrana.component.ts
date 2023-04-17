import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Obrok } from 'src/app/models/obrok';
import { PlanIshrane } from 'src/app/models/plan_ishrane';
import { TrenerService } from 'src/app/services/trener.service';
import { ModalService } from 'src/app/shared/_modal';

@Component({
  selector: 'app-trener-ishrana',
  templateUrl: './trener-ishrana.component.html',
  styleUrls: ['./trener-ishrana.component.css'],
})
export class TrenerIshranaComponent implements OnInit, OnDestroy {
  constructor(
    private toastrService: ToastrService,
    private trenerService: TrenerService,
    public modalService: ModalService
  ) {}

  planovi: any;
  tipoviObroka = [
    'Doručak',
    'Prepodnevna užina',
    'Ručak',
    'Popodnevna užina',
    'Večera',
  ];
  vrstaObroka = [
    'Svaštojed',
    'Vegan',
    'Vegeterijanac',
    'Pesketerijanac',
    'Dijeta',
  ];
  obroci: any;
  sub: Subscription;
  ngOnInit(): void {
    this.load();
  }

  load(){
    this.sub = this.trenerService
      .getMePlanoviIshrane(+localStorage.getItem('korisnikID'))
      .subscribe((planovi) => {
        this.planovi = planovi;
      });
  }
  selectedTip: any;
  selectedVrsta: any;
  pretraga() {
    console.log(this.selectedTip, this.noviPlan.Tip);
    if (this.selectedTip && this.noviPlan.Tip) {
      this.trenerService
        .getMeObrociByTipIVrsta(this.selectedTip, this.noviPlan.Tip)
        .subscribe((obroci) => {
          this.obroci = obroci;
          if(this.obroci.length==0){
            this.toastrService.info("Ne postoje ovakvi obroci","Info");
          }
          let pom = [];
          this.obroci.forEach(obrok => {
              if(pom.findIndex(p=>p.Naziv === obrok.Naziv) === -1)
                  pom.push(obrok);
          });
          this.obroci = pom;
        });
    }
    else this.toastrService.error("Morate izabrati oba parametra","Error");
  }

  planZaPrikazivanje: any;
  nazivPlana: string;
  subDetalji: Subscription;
  prikaziDetalje(selectedPlan) {
    this.subDetalji = this.trenerService
      .getMeObrociZaPlanIshrane(selectedPlan.ID)
      .subscribe((plan) => {
        this.planZaPrikazivanje = plan;
        this.planZaPrikazivanje.ID = selectedPlan.ID;
        this.nazivPlana = selectedPlan.Naziv;
        console.log(this.planZaPrikazivanje);
        setTimeout(() => {
          this.modalService.open('modal-Detalji');
        });
      });
  }

  noviPlan:any = {
    TrenerID:+localStorage.getItem("korisnikID")
  }

  noviPlanIshraneKlik() {
    this.modalService.open('modal');

  }
  napraviPlanIshrane() {

    let objekatZaSlanje;
    let obrociZaSlanje = [];
    this.clearFix();
    this.ponedeljak.forEach((obrok) => {
      obrok.Dan = "PON";
      obrociZaSlanje.push(obrok);
    });
    this.utorak.forEach((obrok) => {
      let indx = obrociZaSlanje.findIndex((v) => v.Naziv === obrok.Naziv);
      if (indx == -1) {
        obrok.Dan = "UTO";
        obrociZaSlanje.push(obrok);
      } else {
        obrociZaSlanje[indx].Dan += ';UTO';
      }
    });
    this.sreda.forEach((obrok) => {
      let indx = obrociZaSlanje.findIndex((v) => v.Naziv === obrok.Naziv);
      if (indx == -1) {
        obrok.Dan = "SRE";
        obrociZaSlanje.push(obrok);
      } else {
        obrociZaSlanje[indx].Dan += ';SRE';
      }
    });
    this.cetvrtak.forEach((obrok) => {
      let indx = obrociZaSlanje.findIndex((v) => v.Naziv === obrok.Naziv);
      if (indx == -1) {
        obrok.Dan = "ČET";
        obrociZaSlanje.push(obrok);
      } else {
        obrociZaSlanje[indx].Dan += ';ČET';
      }
    });
    this.petak.forEach((obrok) => {
      let indx = obrociZaSlanje.findIndex((v) => v.Naziv === obrok.Naziv);
      if (indx == -1) {
        obrok.Dan = "PET";
        obrociZaSlanje.push(obrok);
      } else {
        obrociZaSlanje[indx].Dan += ';PET';
      }
    });
    this.subota.forEach((obrok) => {
      let indx = obrociZaSlanje.findIndex((v) => v.Naziv === obrok.Naziv);
      if (indx == -1) {
        obrok.Dan = "SUB";
        obrociZaSlanje.push(obrok);
      } else {
        obrociZaSlanje[indx].Dan += ';SUB';
      }
    });
    this.nedelja.forEach((obrok) => {
      let indx = obrociZaSlanje.findIndex((v) => v.Naziv === obrok.Naziv);
      if (indx == -1) {
        obrok.Dan = "NED";
        obrociZaSlanje.push(obrok);
      } else {
        obrociZaSlanje[indx].Dan += ';NED';
      }
    });
    let pomPlan = this.noviPlan
    objekatZaSlanje = {
      PlanIshrane:pomPlan,
      Obroci:obrociZaSlanje
    }
    console.log(objekatZaSlanje);
    this.trenerService.createPlanIshrane(objekatZaSlanje).subscribe(()=>{
      this.modalService.close("modal");
      this.toastrService.success("Plan napravjen","Success");
      setTimeout(()=>{
        this.load();
      })
    },(err)=>{
      this.toastrService.error(err,"Error");
    })
  }

  clearFix(){
    this.ponedeljak.map(p=>p.Dan = "");
    this.utorak.map(p=>p.Dan = "");
    this.sreda.map(p=>p.Dan = "");
    this.cetvrtak.map(p=>p.Dan = "");
    this.petak.map(p=>p.Dan = ""); 
    this.subota.map(p=>p.Dan = "");
    this.nedelja.map(p=>p.Dan = "");
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ponedeljak = [];
  utorak = [];
  sreda = [];
  cetvrtak = [];
  petak = [];
  subota = [];
  nedelja = [];
  selectedTab=0;

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedTab = tabChangeEvent.index;
  }

  dodajUListu(obrok, tab) {
    switch (tab) {
      case 0: {
        if (this.ponedeljak.findIndex((v) => v.Naziv === obrok.Naziv) == -1) {
          this.ponedeljak.push(obrok);
        }
        break;
      }
      case 1: {
        if (this.utorak.findIndex((v) => v.Naziv === obrok.Naziv) == -1) {
          this.utorak.push(obrok);
        }
        break;
      }
      case 2: {
        if (this.sreda.findIndex((v) => v.Naziv === obrok.Naziv) == -1) {
          this.sreda.push(obrok);
        }
        break;
      }
      case 3: {
        if (this.cetvrtak.findIndex((v) => v.Naziv === obrok.Naziv) == -1) {
          this.cetvrtak.push(obrok);
        }
        break;
      }
      case 4: {
        if (this.petak.findIndex((v) => v.Naziv === obrok.Naziv) == -1) {
          this.petak.push(obrok);
        }
        break;
      }
      case 5: {
        if (this.subota.findIndex((v) => v.Naziv === obrok.Naziv) == -1) {
          this.subota.push(obrok);
        }
        break;
      }
      case 6: {
        if (this.nedelja.findIndex((v) => v.Naziv === obrok.Naziv) == -1) {
          this.nedelja.push(obrok);
        }
        break;
      }
      default:
        break;
    }
  }

  izbaciIzListe(obrok, selectedTab) {
    switch (selectedTab) {
      case 0: {
        let indx = this.ponedeljak.indexOf(obrok,0);
        this.ponedeljak.splice(indx, 1);
        break;
      }
      case 1: {
        let indx = this.utorak.indexOf(obrok,0);
        this.utorak.splice(indx, 1);
        break;
      }
      case 2: {
        let indx = this.sreda.indexOf(obrok,0);
        this.sreda.splice(indx, 1);
        break;
      }
      case 3: {
        let indx = this.cetvrtak.indexOf(obrok,0);
        this.cetvrtak.splice(indx, 1);
        break;
      }
      case 4: {
        let indx = this.petak.indexOf(obrok,0);
        this.petak.splice(indx, 1);
        break;
      }
      case 5: {
        let indx = this.subota.indexOf(obrok,0);
        this.subota.splice(indx, 1);
        break;
      }
      case 6: {
        let indx = this.nedelja.indexOf(obrok,0);
        this.nedelja.splice(indx, 1);
        break;
      }
      default:
        break;
    }
  }

  clickObrisi = false;
  obrisiPlan(id:number){
    if(!this.clickObrisi)
    {
      this.toastrService.info("Kliknite opet na kanticu kako bi potvrdili brisanje plana", "Info");
      this.clickObrisi = true;
    }
    else{
      this.trenerService.obrisiPlanIshrane(id).subscribe(()=>{
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

  noviObrokClick = false;
  noviObrokZaDodavanje:Obrok;
  nizTipovaObroka = ["Doručak","Prepodnevna užina","Ručak","Popodnevna užina","Večera"];
  nizVrstiObroka = ["Svaštojed","Pesketerijanac","Vegan","Dijeta","Vegeterijanac"];
  noviObrok:Obrok = {};


  napraviObrok(){
    this.noviObrokClick = true;
  }
  potvrdiPromene(){
    this.trenerService.napraviNoviObrok(this.noviObrok).subscribe(()=>{
      this.toastrService.success("Obrok napravljen", "Success");
      this.noviObrokClick = false;
      this.load();
    })
  }
}
