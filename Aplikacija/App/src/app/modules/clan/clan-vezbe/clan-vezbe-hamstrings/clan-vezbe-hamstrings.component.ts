import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Vezba } from 'src/app/models/vezba';
import { ClanService } from 'src/app/services/clan.service';
import { SafePipe } from 'src/app/shared/modules/safe-pipe/safe.pipe';

@Component({
  selector: 'app-clan-vezbe-hamstrings',
  templateUrl: './clan-vezbe-hamstrings.component.html',
  styleUrls: ['./clan-vezbe-hamstrings.component.css']
})
export class ClanVezbeHamstringsComponent implements OnInit {

  constructor(private clanService: ClanService, private safePipe:SafePipe) {}

  vezbe: Observable<Vezba[]> | null = null;
  ngOnInit(): void {
    this.vezbe=this.clanService.getVezbeHamstrings();
  }
}
