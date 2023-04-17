import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-vezbe-main',
  templateUrl: './vezbe-main.component.html',
  styleUrls: ['./vezbe-main.component.css']
})
export class VezbeMainComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  redirect(part:string){
    this.router.navigateByUrl(`/clan/vezbe/${part}`);
  }
}
