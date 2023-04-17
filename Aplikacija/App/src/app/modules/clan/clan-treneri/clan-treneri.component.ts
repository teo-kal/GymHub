import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Trener } from 'src/app/models/trener';
import { ClanService } from 'src/app/services/clan.service';
import { ModalService } from 'src/app/shared/_modal';

@Component({
  selector: 'app-clan-treneri',
  templateUrl: './clan-treneri.component.html',
  styleUrls: ['./clan-treneri.component.css'],
})
export class ClanTreneriComponent implements OnInit {
  constructor(
    public modalService: ModalService,
    private clanService: ClanService,
    private toastrService: ToastrService,
    private router:Router
  ) {}

  trenerIzabran: boolean;
  treneriObv: Observable<Trener[]> = of([]);
  clan:any;
  ngOnInit(): void {
    this.treneriObv = this.clanService.getSviTreneri();
    this.clanService
      .getMe(+localStorage.getItem('korisnikID'))
      .subscribe((clan: any) => {
        if (clan.ImeTrenera != null) {
          this.trenerIzabran = true;
        } else this.trenerIzabran = false;
        this.clan = clan;
      });
  }

  zaSlanje: any = {
    ID: -1,
    TrenerID: -1,
  };
  izaberiTreneraKlik(t: any) {
    let danas = new Date(Date.now());
    let poslednjePlacanje = new Date(this.clan.DatPoslednjegPlacanja);
    if(danas.getDate() - poslednjePlacanje.getDate() <= 7)
    {
      this.zaSlanje.TrenerID = t.ID;
      this.zaSlanje.ID = +localStorage.getItem('korisnikID');
      this.modalService.open('confirm');
    }
    else {
      this.toastrService.error("Prošao vam je period u kom ste mogli da zakažete trenera. Korisnici mogu zakazati trenera u roku od nedelju dana od plaćanja članarine","Error");
    }
  }

  izaberiTrenera() {
    this.clanService.izaberiTrenera(this.zaSlanje).subscribe(
      () => {
        this.modalService.close('confirm');
        this.toastrService.success('Uspešno ste izabrali trenera', 'Success');
        setTimeout(() => {
          this.router.navigateByUrl('/clan');
        });
      },
      () => {
        this.toastrService.error('Došlo je do greške', 'Error');
      }
    );
  }
}
