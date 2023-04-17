import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Calendar, diffDays } from '@fullcalendar/angular';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Clan } from 'src/app/models/clan';
import { PaymentDetails } from 'src/app/models/paymentDetails';
import { Trener } from 'src/app/models/trener';
import { ClanService } from 'src/app/services/clan.service';
import { ModalService } from 'src/app/shared/_modal';

@Component({
  selector: 'app-clan-main-page',
  templateUrl: './clan-main-page.component.html',
  styleUrls: ['./clan-main-page.component.css'],
})
export class ClanMainPageComponent implements OnInit {
  constructor(
    private toastrService: ToastrService,
    private clanService: ClanService,
    public modalService: ModalService,
    private router:Router
  ) {}

  clanObv: Observable<Clan>;
  trener: Trener | null = null;

  platioClanarinu:boolean;

  idClanaZaPrikaz: string;

  uplate = [
    {name:"Mesec dana", value:1},
    {name:"Šest meseci", value:6},
    {name:"Godinu dana", value:12},
  ]
  tipClanarina = [
    "Samostalni",
    "Grupni",
    "Personalni"
  ]

  clanZaPrikaz:any;
  ngOnInit(): void {
    this.idClanaZaPrikaz = localStorage.getItem('korisnikID');
    this.clanService.getMe(+this.idClanaZaPrikaz).subscribe((clan)=>{
      this.clanZaPrikaz = clan;
      let danas:Date = new Date(Date.now());
      let datPlacanja:Date = new Date(this.clanZaPrikaz.DatPoslednjegPlacanja);
      if(danas.getFullYear() - datPlacanja.getFullYear() > 1 || danas.getMonth() - datPlacanja.getMonth() > this.clanZaPrikaz.Period || danas.getDay() - datPlacanja.getDay() < 0){
        this.router.navigate(['/plati'],{queryParams:{korisnikID:this.idClanaZaPrikaz}});
      }
      else
      {
        let datumIsteka = new Date();
        if(datPlacanja.getMonth() == 12){
          datumIsteka.setFullYear(datumIsteka.getUTCFullYear() + 1);
        }
        console.log("DATUM PLACANJA "+ datPlacanja);
        datumIsteka.setMonth((datPlacanja.getMonth() + this.clanZaPrikaz.Period));
        datumIsteka.setDate((datPlacanja.getDate()));
        console.log("DATUM ISTEKA: "+ datumIsteka);
        let diffInTime = datumIsteka.getTime() - danas.getTime();
        let diffInDays = diffInTime / (1000 * 3600 * 24);
        console.log(diffInDays);
        if(diffInDays < 3){
          this.toastrService.info("Uskoro će vam isteći članarina, molimo vas da izmirite dugovanja","Info");
        }
      }
    })
  }
  
  vote(Akcija: string, TrenerID: number, Ocena: number) {
    let objZaSlanje = {
      Akcija,
      TrenerID,
      Ocena,
      ID: +localStorage.getItem('korisnikID'),
    };
    this.clanService.oceniTrenera(objZaSlanje).subscribe(
      () => {
        this.toastrService.success('Uspešno ste ocenili trenera', 'Success');
        setTimeout(() => {
          this.load();
        });
      },
      () => {
        this.toastrService.error('Došlo je do greške', 'Error');
      }
    );
  }
  load() {
    this.clanService.getMe(+this.idClanaZaPrikaz).subscribe((clan)=>{
      this.clanZaPrikaz = clan;
    })
  }

  otkaziTrening(){
    this.clanService.otkaziTrening(+localStorage.getItem("korisnikID")).subscribe(()=>{
      this.toastrService.success('Uspešno ste otkazali trening', 'Success');
      this.load();
    },()=>{
      this.toastrService.error('Došlo je do greške', 'Error');
    })
  }


  iban:any;
  cNumber:any;
  name:any;
  sc:any;
  clanZaPlacanje:any;
  selektovaniPeriod:number;
  periodpopust:number = 0;
  tipClanarine:string;
  platiClanarinuKlik(clan){
    this.modalService.open("modal-Plati");
    this.clanZaPlacanje = clan;
    this.tipClanarine = this.clanZaPlacanje.TipClanarine;
  }

  popust()
  {
    if(this.selektovaniPeriod != 0)
    {
      switch(this.selektovaniPeriod){
        case 12 : {this.periodpopust = 9; break;}
        case 6: {this.periodpopust = 5;break;}
        default:{this.periodpopust = 1;break;}
      }
    }
  }

  platiClanarinu(){
    const obj = {
      ClanID:+localStorage.getItem("korisnikID"),
      Tip:this.tipClanarine,
      Period:this.selektovaniPeriod
    }
    this.clanService.platiClanarinu(obj).subscribe(()=>{
      this.toastrService.success("Uspešno ste platili članarinu","Success");
      this.modalService.close("modal-Plati");
      setTimeout(()=>{
        this.load();
      })
    },()=>{
      this.toastrService.error('Došlo je do greške', 'Error');
    })
  }

  zeliPromenu:boolean = false;
  prikaziMenjanjeClanarine(){
    this.zeliPromenu = true;
  }

  visina:number;
  tezina:number;
  bmiNumber:number;
  bmi:string;
  bmiVrednost:string;
  izracunajBMI(){
    this.bmiNumber = (this.tezina/Math.pow(this.visina/100,2));
    this.bmi = this.bmiNumber.toPrecision(2);
    if(this.bmiNumber>25) this.bmiVrednost = "popunjen";
    else{
      if(this.bmiNumber<18.5) this.bmiVrednost = "mršav";
      else this.bmiVrednost="normalan";
    } 
  }
}
