import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Vezba } from 'src/app/models/vezba';
import { ClanService } from 'src/app/services/clan.service';
import { SafePipe } from 'src/app/shared/modules/safe-pipe/safe.pipe';

@Component({
  selector: 'app-clan-vezbe-shoulders',
  templateUrl: './clan-vezbe-shoulders.component.html',
  styleUrls: ['./clan-vezbe-shoulders.component.css']
})
export class ClanVezbeShouldersComponent implements OnInit {

  constructor(private clanService: ClanService, safePipe:SafePipe) {}

  vezbe: Observable<Vezba[]> | null = null;
  ngOnInit(): void {
    this.vezbe=this.clanService.getVezbeShoulders();
  }

}
