import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ClanService } from 'src/app/services/clan.service';
import { ModalService } from 'src/app/shared/_modal';

@Component({
  selector: 'app-clan-ishrana',
  templateUrl: './clan-ishrana.component.html',
  styleUrls: ['./clan-ishrana.component.css'],
})
export class ClanIshranaComponent implements OnInit, OnDestroy {
  constructor(private clanService: ClanService, public modalService:ModalService) {}

  planPon = [];
  planUto = [];
  planSre = [];
  planCet = [];
  planPet = [];
  planSub = [];
  planNed = [];
  plan: any = {};
  sub: Subscription;
  ngOnInit(): void {
    this.sub = this.clanService
      .getMePlanoviIshrane(+localStorage.getItem('korisnikID'))
      .subscribe(
        (plan) => {
          this.plan = plan;
          console.log(this.plan.Obroci[0].Dan);
          this.planPon = this.plan.Obroci.filter((x) => x.Dan.includes('PON'));
          this.planUto = this.plan.Obroci.filter((x) => x.Dan.includes('UTO'));
          this.planSre = this.plan.Obroci.filter((x) => x.Dan.includes('SRE'));
          this.planCet = this.plan.Obroci.filter((x) => x.Dan.includes('ČET'));
          this.planPet = this.plan.Obroci.filter((x) => x.Dan.includes('PET'));
          this.planSub = this.plan.Obroci.filter((x) => x.Dan.includes('SUB'));
          this.planNed = this.plan.Obroci.filter((x) => x.Dan.includes('NED'));
        },
        () => {
          this.plan = null;
        }
      );
  }

  obrokZaPrikaz:any;
  prikaziDetalje(obrok:any){
    this.obrokZaPrikaz = obrok;
    this.modalService.open('modal');
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
