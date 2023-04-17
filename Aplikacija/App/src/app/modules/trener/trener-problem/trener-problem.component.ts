import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TrenerService } from 'src/app/services/trener.service';

@Component({
  selector: 'app-trener-problem',
  templateUrl: './trener-problem.component.html',
  styleUrls: ['./trener-problem.component.css'],
})
export class TrenerProblemComponent implements OnInit, OnDestroy {
  constructor(
    private toasrtService: ToastrService,
    private trenerService: TrenerService
  ) {}

  trener: any;
  sub: Subscription;
  ngOnInit(): void {
    this.sub = this.trenerService
      .getMeProblem(+localStorage.getItem('korisnikID'))
      .subscribe((trener: any) => {
        this.trener = trener;
        this.objZaSlanje.emailAdresa = trener.korisnik.Email;
      });
  }

  objZaSlanje = {
    emailAdresa: '',
    naslov: '',
    tekst: '',
  };

  sendRequest() {
    this.sub = this.trenerService.sendMail(this.objZaSlanje).subscribe(
      () => {
        this.toasrtService.success('Mejl poslat', 'Success');
      },
      () => {
        this.toasrtService.error('Došlo je do greške', 'Greška');
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  unsubscribe(){
    if (this.sub) this.sub.unsubscribe();
  }
}
