import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClanService } from 'src/app/services/clan.service';

@Component({
  selector: 'app-plati-clanarinu',
  templateUrl: './plati-clanarinu.component.html',
  styleUrls: ['./plati-clanarinu.component.css'],
})
export class PlatiClanarinuComponent implements OnInit {
  constructor(
    private clanService: ClanService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  iban: any;
  cNumber: any;
  name: any;
  sc: any;

  uplate = [
    { name: 'Mesec dana', value: 1 },
    { name: 'Šest meseci', value: 6 },
    { name: 'Godinu dana', value: 12 },
  ];
  tipClanarina = [
    "Samostalni",
    "Grupni",
    "Personalni"
  ]

  clanID: number;

  ngOnInit(): void {
    this.clanID = +this.route.snapshot.queryParamMap.get('korisnikID');
    this.clanService
      .getTipClanarineZaPlacanje(this.clanID)
      .subscribe((tip: any) => {
        this.tipClanarine = tip.TipClanarine;
        console.log(this.tipClanarine)
      });
  }

  selektovaniPeriod: number;
  periodpopust: number = 0;
  tipClanarine: string;

  popust() {
    if (this.selektovaniPeriod != 0) {
      switch (this.selektovaniPeriod) {
        case 12: {
          this.periodpopust = 9;
          break;
        }
        case 6: {
          this.periodpopust = 5;
          break;
        }
        default: {
          this.periodpopust = 1;
          break;
        }
      }
    }
  }

  platiClanarinu() {
    const obj = {
      ClanID: this.clanID,
      Tip: this.tipClanarine,
      Period: this.selektovaniPeriod,
    };
    console.log(obj);
    this.clanService.platiClanarinu(obj).subscribe(
      () => {
        this.toastrService.success('Uspešno ste platili članarinu, molimo vas da se ulogujete ponovo', 'Success');
        this.router.navigate(['']);
      },
      () => {
        this.toastrService.error('Došlo je do greške', 'Error');
      }
    );
  }

  zeliPromenu: boolean = false;
  prikaziMenjanjeClanarine() {
    this.zeliPromenu = true;
  }
}
