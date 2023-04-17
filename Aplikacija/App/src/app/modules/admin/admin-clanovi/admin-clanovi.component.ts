import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, Subscription } from 'rxjs';
import { Clan } from 'src/app/models/clan';
import { UserRegisterDto } from 'src/app/models/userRegisterDto';
import { ClanService } from 'src/app/services/clan.service';
import { ModalService } from 'src/app/shared/_modal';

@Component({
  selector: 'app-admin-clanovi',
  templateUrl: './admin-clanovi.component.html',
  styleUrls: ['./admin-clanovi.component.css'],
})
export class AdminClanoviComponent implements OnInit {
  constructor(
    public modalService: ModalService,
    private clanService: ClanService,
    private toastrService: ToastrService
  ) {}

  clanovi: Observable<Clan[]> = of([]);

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.clanovi = this.clanService.getAll();
  }

  clanZaDodavanje: UserRegisterDto = {};

  clickObrisi = false;

  obrisi(clan: Clan) {

    if (this.clickObrisi) {
      this.clanService.delete(clan.ID).subscribe(
        () => {
          this.load();
          this.toastrService.success('Uspesno obrisan', 'Success');
          this.clickObrisi = false;
        },
        () => {
          this.toastrService.error('Došlo je do greške', 'Error');
        }
      );
    }
    
    if (!this.clickObrisi) {
      this.toastrService.info(
        'Kliknite opet na kanticu da biste potvrdili brisanje',
        'Info'
      );
      this.clickObrisi = true;
    }
  }
  dodajKlik() {
    this.modalService.open('modal-Novi');
  }
  dodaj() {
    let danas = new Date(Date.now());
    if(danas.getFullYear() -this.clanZaDodavanje.DatRodjenja.getFullYear() > 16){
      console.log(this.clanZaDodavanje);
      this.clanService.create(this.clanZaDodavanje).subscribe(
        () => {
          this.modalService.close('modal-Novi');
          this.toastrService.success('Uspešno kreiran član', 'Success');
          this.load();
        },
        () => {
          this.modalService.close('modal-Novi');
          this.toastrService.error('Došlo je do greške', 'Error');
        }
      );
    }
    else this.toastrService.error('Član mora imati više od 16 godina', 'Error');
  }

  clanZaPotvrduID: number;
  tipClanarine: string;
  periodClanarine: string;

  uplate = [
    { name: 'Mesec dana', value: 1 },
    { name: 'Šest meseci', value: 6 },
    { name: 'Godinu dana', value: 12 },
  ];

  tipClanarina = ['Samostalni', 'Grupni', 'Personalni'];

  potvrdiUplatu() {
    const objZaSlanje = {
      ClanID: this.clanZaPotvrduID,
      Tip: this.tipClanarine,
      Period: this.periodClanarine,
    };
    this.clanService.potvrdiUplatuClana(objZaSlanje).subscribe(
      () => {
        this.toastrService.success('Uspešno potvrđena uplata', 'Success');
        this.modalService.close('modal-Confirm');
        this.load();
      },
      () => {
        this.toastrService.error('Došlo je do greška', 'Error');
      }
    );
  }
  potvrdiUplatuKlik(clan) {
    this.clanZaPotvrduID = clan.ID;
    this.modalService.open('modal-Confirm');
  }
}
