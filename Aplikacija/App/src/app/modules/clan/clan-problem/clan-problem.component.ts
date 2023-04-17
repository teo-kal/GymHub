import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Clan } from 'src/app/models/clan';
import { ClanService } from 'src/app/services/clan.service';

@Component({
  selector: 'app-clan-problem',
  templateUrl: './clan-problem.component.html',
  styleUrls: ['./clan-problem.component.css'],
})
export class ClanProblemComponent implements OnInit {
  constructor(
    private toastrService: ToastrService,
    private clanService: ClanService
  ) {}

  clanObv: Observable<any>;
  clan: Clan;
  problem = {
    emailAdresa: '',
    naslov: '',
    tekst: '',
  };
  ngOnInit(): void {
    this.clanObv = this.clanService.getMePrijaviProblem(
      +localStorage.getItem('korisnikID')
    );
    this.clanObv.subscribe((clan: any) => {
      this.clan = clan;
      this.problem.emailAdresa = clan.email;
    });
  }

  sendRequest() {
    console.log(this.problem);
    this.clanService.posaljiMejlProblem(this.problem).subscribe(()=>{
      this.toastrService.success("Mejl poslat", "Success");
    },()=>{
      this.toastrService.error("Greška pri slanju", "Error");
    });
  }
}
