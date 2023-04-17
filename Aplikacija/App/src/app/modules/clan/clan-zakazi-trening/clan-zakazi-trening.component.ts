import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import { ToastrService } from 'ngx-toastr';
import { ClanService } from 'src/app/services/clan.service';
import { ModalService } from 'src/app/shared/_modal';

@Component({
  selector: 'app-clan-zakazi-trening',
  templateUrl: './clan-zakazi-trening.component.html',
  styleUrls: ['./clan-zakazi-trening.component.css'],
})
export class ClanZakaziTreningComponent implements OnInit {
  constructor(
    private router: Router,
    private clanService: ClanService,
    public modalService: ModalService,
    private toastrService:ToastrService
  ) {}
  termini: any;
  ngOnInit(): void {
    this.inicijalizujMatricu();
    this.load();
  }
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    // dateClick: this.handleDateClick.bind(this),
    allDaySlot: false,
    headerToolbar: {
      right: '',
    },
    eventClick: this.handleEventClick.bind(this),
  };

  day: string;
  time: string;
  end: string;

  handleEventClick(arg) {
    let today = new Date(Date.now());
    let date = arg.event.start;
    if (date >= today) {
      let dan = date.toString().substring(0, 3);
      switch (dan) {
        case 'Mon': {
          this.day = 'PON';
          break;
        }
        case 'Tue': {
          this.day = 'UTO';
          break;
        }
        case 'Wed': {
          this.day = 'SRE';
          break;
        }
        case 'Thu': {
          this.day = 'ČET';
          break;
        }
        case 'Fri': {
          this.day = 'PET';
          break;
        }
        case 'Sun': {
          this.day = 'NED';
          break;
        }
        case 'Sat': {
          this.day = 'SUB';
          break;
        }
        default: {
          this.day = null;
          break;
        }
      }
      this.time = date.toString().substring(16, 21);
      let endNiz = this.time.split(':');

      if (endNiz[1] == '00') {
        this.end = `${+endNiz[0] + 1}:30`;
      } else {
        this.end = `${+endNiz[0] + 2}:00`;
      }
      let Termin = `${this.day}(${this.time}-${this.end})`;
      let objTermin = {
        Termin
      }
      if(this.nizZakazanihTermina[this.day][this.time] + 1 <= 6)
      {
        if(this.clan.TrenerID)
        {
        this.clanService.proveriTerminZaTrening(+localStorage.getItem("korisnikID"), Termin).subscribe(()=>{
          this.modalService.open('modal');
        }, ()=>{
          this.toastrService.info("Vaš trener ima trening u datom terminu, probajte neki naredni", "Info");
        })}
        else this.modalService.open("modal");
      }  
      else  this.toastrService.info("Nema kapaciteta u ovom terminu, probajte neki naredni", "Info");
    }
    else  this.toastrService.error("Ne možete zakazati trening za vreme koje je prošlo", "Error");
  
  }
  zakaziTrening() {
    console.log(this.day, this.time + '-' + this.end);
    let Kod = this.napraviKod(4);
    let ClanID = +localStorage.getItem('korisnikID');
    let Termin = `${this.day}(${this.time}-${this.end})`;
    const obj = {
      ClanID,
      Termin,
      Kod,
    };
    this.clanService.zakaziTrening(obj).subscribe(()=>{
      this.toastrService.success("Uspešno zakazan trening", "Success");
      this.modalService.close('modal');
      setTimeout(()=>{
        this.router.navigate(['/clan']);
      })
    })
  }

  clan;
  load(){
    this.clanService.getMe(+localStorage.getItem("korisnikID")).subscribe((clan)=>{
      this.clan = clan;
    });
    this.clanService.getSviTermini().subscribe((termini) => {
      let zaKalendar: any = [];
      this.termini = termini;
      this.termini.grupa.forEach((g) => {
        const nizTerminaGrupe = g.Termini.split(';');
        nizTerminaGrupe.forEach((element) => {
          let dan = this.nizDana.findIndex(
            (x) => x === element.substring(0, 3)
          );
          let start = element.substring(4, 9);
          let end = element.substring(10, 15);

          this.nizZakazanihTermina[this.nizDana[dan]][start] += g.TrenutniKap;
        });
      });

      this.termini.treninzi.forEach((trening) => {
        let dan = this.nizDana.findIndex(
          (x) => x === trening.Termin.substring(0, 3)
        );
        let start = trening.Termin.substring(4, 9);
        this.nizZakazanihTermina[this.nizDana[dan]][start] += 1;
      });

      this.nizDana.forEach((dan) => {
        this.nizTermina.forEach((termin) => {
          let brojLjudi = this.nizZakazanihTermina[dan][termin];
          console.log(dan, termin, this.nizZakazanihTermina[dan][termin]);

          let title = `${brojLjudi}/6`;
          let start = termin;
          let endNiz = termin.split(':');
          let end;
          if (endNiz[1] == '00') {
            end = `${+endNiz[0] + 1}:30`;
          } else {
            end = `${+endNiz[0] + 2}:00`;
          }
          let obj = {
            title,
            startTime: start,
            endTime: end,
            daysOfWeek: this.nizDana.findIndex((x) => x === dan).toString(),
          };
          zaKalendar.push(obj);
        });
      });
      this.calendarOptions.events = zaKalendar;
    });
  }

  napraviKod(length) {
    let result = '';
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  inicijalizujMatricu() {
    this.nizZakazanihTermina = new Array(7);
    this.nizDana.forEach((dan) => {
      this.nizZakazanihTermina[dan] = new Array(this.nizTermina.length);
    });
    this.nizDana.forEach((dan) => {
      this.nizTermina.forEach((ter) => {
        this.nizZakazanihTermina[dan][ter] = 0;
      });
    });
  }

  nizDana = ['NED', 'PON', 'UTO', 'SRE', 'ČET', 'PET', 'SUB'];
  nizTermina = [
    '09:00',
    '10:30',
    '12:00',
    '13:30',
    '15:00',
    '16:30',
    '18:00',
    '19:30',
    '21:00',
  ];

  nizZakazanihTermina;
}
