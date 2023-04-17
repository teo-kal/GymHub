import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, Subscription } from 'rxjs';
import { Trener } from 'src/app/models/trener';
import { TrenerService } from 'src/app/services/trener.service';
import { ModalService } from 'src/app/shared/_modal';

@Component({
  selector: 'app-admin-treneri',
  templateUrl: './admin-treneri.component.html',
  styleUrls: ['./admin-treneri.component.css'],
})
export class AdminTreneriComponent implements OnInit {
  constructor(
    public modalService: ModalService,
    private trenerService: TrenerService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.treneri = this.trenerService.getAll();
  }

  treneri: Observable<Trener[]> = of([]);

  trenerZaDodavanje: Trener = {};

  podaciZaSlanje: any = {
    ID: -1,
    Specijalizacija: '',
    Zvanje: '',
  };

  izmeniKlik(trener: Trener) {
    this.podaciZaSlanje.ID = trener.ID;
    this.podaciZaSlanje.Specijalizacija = trener.Specijalizacija;
    this.podaciZaSlanje.Zvanje = trener.Zvanje;
    setTimeout(() => {
      this.modalService.open('modal-Izmeni');
    });
  }

  izmeniTrenera() {
    this.modalService.close('modal-Izmeni');
    this.trenerService.update(this.podaciZaSlanje).subscribe(
      () => {
        this.load();
        this.toastrService.success(
          'Uspešno ste modifikovali trenera',
          'Success'
        );
        this.modalService.close('modal-Izmeni');
      },
      () => {
        this.toastrService.error('Došlo je do greške', 'Error');
        this.modalService.close('modal-Izmeni');
      }
    );
  }

  clickObrisi = false;
  obrisi(trener: Trener) {
    if (this.clickObrisi) {
      this.trenerService.delete(trener.ID).subscribe(
        () => {
          this.load();
          this.toastrService.success('Uspešno obrisan', 'Success');
          this.clickObrisi = false;
        },
        () => {
          this.toastrService.error('Došlo je do greške', 'Error');
        }
      );
    }

    if(!this.clickObrisi){
      this.toastrService.info(
        'Kliknite opet na kanticu da biste potvrdili brisanje',
        'Info'
      );
      this.clickObrisi = true;
    }
  }

  load() {
    this.treneri = this.trenerService.getAll();
  }

  dodaj() {
    let danas = new Date(Date.now());
    if(danas.getFullYear() -this.trenerZaDodavanje.DatRodjenja.getFullYear() > 16){
      console.log(this.trenerZaDodavanje);
      this.trenerService.create(this.trenerZaDodavanje).subscribe(
        () => {
          this.modalService.close('modal-Novi');
          this.toastrService.success('Uspešno kreiran trener', 'Success');
          this.load();
        },
        () => {
          this.modalService.close('modal-Novi');
          this.toastrService.error('Došlo je do greške', 'Error');
        }
      );
    }else this.toastrService.error('Trener mora biti punoletan', 'Error');

  }
}
