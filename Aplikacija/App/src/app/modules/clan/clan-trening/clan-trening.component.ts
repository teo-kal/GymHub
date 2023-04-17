import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ClanService } from 'src/app/services/clan.service';
import { SafePipe } from 'src/app/shared/modules/safe-pipe/safe.pipe';
import { ModalService } from 'src/app/shared/_modal';

@Component({
  selector: 'app-clan-trening',
  templateUrl: './clan-trening.component.html',
  styleUrls: ['./clan-trening.component.css'],
})
export class ClanTreningComponent implements OnInit, OnDestroy {
  constructor(
    private clanService: ClanService,
    public modalService: ModalService,
    private safePipe:SafePipe
  ) {}

  plan: any = {};
  sub: Subscription;

  planTreningaObv: Observable<any>;
  naziviPon = [];
  vezbePon = [];
  vezbeUto = [];
  naziviUto = [];
  vezbeSre = [];
  naziviSre = [];
  vezbeCet = [];
  naziviCet = [];
  vezbePet = [];
  naziviPet = [];
  vezbeSub = [];
  naziviSub = [];
  vezbeNed = [];
  naziviNed = [];

  ngOnInit(): void {
    this.sub = this.clanService
      .getMePlanoviTreninga(+localStorage.getItem('korisnikID'))
      .subscribe(
        (plan) => {
          this.plan = plan;
          this.vezbePon = this.plan.Vezbe.filter((x) => x.Dani.includes('PON'));
          let pomIDVezbi = this.vezbePon.map((x) => x.VezbaID);
          this.naziviPon = this.plan.Nazivi.filter((x) =>
            pomIDVezbi.includes(x.ID)
          ).map((x) => x.Naziv);

          this.vezbeUto = this.plan.Vezbe.filter((x) => x.Dani.includes('UTO'));
          pomIDVezbi = this.vezbeUto.map((x) => x.VezbaID);
          this.naziviUto = this.plan.Nazivi.filter((x) =>
            pomIDVezbi.includes(x.ID)
          ).map((x) => x.Naziv);

          this.vezbeSre = this.plan.Vezbe.filter((x) => x.Dani.includes('SRE'));
          pomIDVezbi = this.vezbeSre.map((x) => x.VezbaID);
          this.naziviSre = this.plan.Nazivi.filter((x) =>
            pomIDVezbi.includes(x.ID)
          ).map((x) => x.Naziv);

          this.vezbeCet = this.plan.Vezbe.filter((x) => x.Dani.includes('ČET'));
          pomIDVezbi = this.vezbeCet.map((x) => x.VezbaID);
          this.naziviCet = this.plan.Nazivi.filter((x) =>
            pomIDVezbi.includes(x.ID)
          ).map((x) => x.Naziv);

          this.vezbePet = this.plan.Vezbe.filter((x) => x.Dani.includes('PET'));
          pomIDVezbi = this.vezbePet.map((x) => x.VezbaID);
          this.naziviPet = this.plan.Nazivi.filter((x) =>
            pomIDVezbi.includes(x.ID)
          ).map((x) => x.Naziv);

          this.vezbeSub = this.plan.Vezbe.filter((x) => x.Dani.includes('SUB'));
          pomIDVezbi = this.vezbeSub.map((x) => x.VezbaID);
          this.naziviSub = this.plan.Nazivi.filter((x) =>
            pomIDVezbi.includes(x.ID)
          ).map((x) => x.Naziv);

          this.vezbeNed = this.plan.Vezbe.filter((x) => x.Dani.includes('NED'));
          pomIDVezbi = this.vezbeNed.map((x) => x.VezbaID);
          this.naziviNed = this.plan.Nazivi.filter((x) =>
            pomIDVezbi.includes(x.ID)
          ).map((x) => x.Naziv);
        },
        () => {
          this.plan = null;
        }
      );
  }

  objZaPrikaz;
  prikaziDetalje(vezba: any) {
    this.objZaPrikaz = this.plan.Nazivi.find((x: any) => x.ID == vezba.VezbaID);
    setTimeout(() => {
      this.modalService.open('modal');
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
