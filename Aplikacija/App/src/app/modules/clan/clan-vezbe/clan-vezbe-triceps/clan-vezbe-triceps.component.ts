import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Vezba } from 'src/app/models/vezba';
import { ClanService } from 'src/app/services/clan.service';
import { SafePipe } from 'src/app/shared/modules/safe-pipe/safe.pipe';

@Component({
  selector: 'app-clan-vezbe-triceps',
  templateUrl: './clan-vezbe-triceps.component.html',
  styleUrls: ['./clan-vezbe-triceps.component.css']
})
export class ClanVezbeTricepsComponent implements OnInit {
  
  constructor(private clanService: ClanService, private safePipe:SafePipe) {}

  vezbe: Observable<Vezba[]> | null = null;
  ngOnInit(): void {
    this.vezbe=this.clanService.getVezbeTriceps();
  }
}
