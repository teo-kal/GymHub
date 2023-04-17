import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarOptions, EventSourceInput } from '@fullcalendar/angular';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { TrenerService } from 'src/app/services/trener.service';

@Component({
  selector: 'app-trener-main-page',
  templateUrl: './trener-main-page.component.html',
  styleUrls: ['./trener-main-page.component.css'],
})
export class TrenerMainPageComponent implements OnInit, OnDestroy {
  constructor(
    private trenerService: TrenerService,
    private toastrService: ToastrService
  ) {}

  trenerObv: Observable<any>;
  subscription: Subscription;
  nizDana = ['NED', 'PON', 'UTO', 'SRE', 'ČET', 'PET', 'SUB'];
  trener;
  ngOnInit(): void {
    this.trenerObv = this.trenerService.getMe(
      +localStorage.getItem('korisnikID')
    );
    this.subscription = this.trenerObv.subscribe((trener) => {
      let nizObjekataZaKalendar: any = [];
      this.trener = trener;
      let brojGrupa = this.trener.grupe.length;
      let brojKlijenata = this.trener.klijenti.length;
      let i: number;
      for (i = 0; i < brojGrupa; i++) {
        let terminiString = this.trener.grupe[i].Termini;
        let nazivGrupe = this.trener.grupe[i].Naziv;
        let terminiNiz = terminiString.split(';');
        terminiNiz.forEach((termin) => {
          let dan = this.nizDana.findIndex((x) => x === termin.substring(0, 3));
          let start = termin.substring(4, 9);
          let end = termin.substring(10, 15);
          let objekat = {
            title: nazivGrupe,
            daysOfWeek: [`${dan}`],
            startTime: start,
            endTime: end,
          };
          nizObjekataZaKalendar.push(objekat);
        });
      }
      for (i = 0; i < brojKlijenata; i++) {
        if (
          this.trener.klijenti[i].GrupaID == null
        ) {
          console.log(this.trener.klijenti[i]);
          this.trener.klijenti[i].Treninzi.forEach((trening, ind) => {

            let dan = this.nizDana.findIndex(
              (x) => x === trening.Termin.substring(0, 3)
            );
            let start = trening.Termin.substring(4, 9);
            let end = trening.Termin.substring(10, 15);
            let objekat = {
              title:
                this.trener.klijenti[i].Ime + ' ' + this.trener.klijenti[i].Prezime,
              daysOfWeek: [`${dan}`],
              startTime: start,
              endTime: end,
            };
            nizObjekataZaKalendar.push(objekat);
          });
        }
      }
      this.calendarOptions.events = nizObjekataZaKalendar;
    });
  }

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    // dateClick: this.handleDateClick.bind(this),
    allDaySlot: false,
    headerToolbar:{
      right:""
    }
  };

  // handleDateClick(arg) {
  //   alert('date click!' + arg.dateStr);
  //   //mozda da izlazi modal sa detaljima (klijent, plan treninga i ishrane koji klijent ima)
  // }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
