import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { Clan } from 'src/app/models/clan';
import { ClanService } from 'src/app/services/clan.service';

@Component({
  selector: 'app-clan-podesavanja',
  templateUrl: './clan-podesavanja.component.html',
  styleUrls: ['./clan-podesavanja.component.css']
})
export class ClanPodesavanjaComponent implements OnInit {


  clanObv:Observable<any>;
  sub:Subscription;
  clan:any;
  constructor(private toastrService:ToastrService, private clanService:ClanService) { }

  ngOnInit(): void {
    this.clanObv = this.clanService.getMePodesavanja(+localStorage.getItem("korisnikID"));
  }
  touched:boolean=false;

  ciljevi=[
    {name:"Mršavljenje", value:"Mršavljenje"},
    {name:"Dobijanje mišićne mase", value:"Dobijanje mišićne mase"},
    {name:"Održavanje figure", value:"Održavanje figure"}
  ];

  saveChanges(clan:any){
    let objZaSlanje={
      ID:+localStorage.getItem("korisnikID"),
      BrojTelefona: clan.BrojTelefona,
      ...clan
    }
    console.log(objZaSlanje);
    this.clanService.SetPodesavanja(objZaSlanje).subscribe(()=>{
      this.toastrService.success("Uspešno izmenjen profil", "Succes");
      setTimeout(()=>{
        this.load();
      })
    },()=>{
      this.toastrService.error("Došlo je do greške","Error");
    })
  }
  load(){
    this.clanObv = this.clanService.getMePodesavanja(+localStorage.getItem("korisnikID"));
  }
  promeniSliku() {

    const uploadData = new FormData();
    uploadData.append('avatar', this.selectedFile, this.selectedFile.name);

    this.clanService.uploadSlika(+localStorage.getItem("korisnikID"), uploadData).subscribe(
      () => {
        console.log('succ');
        this.load();
      },
      () => {
        console.log('erro');
      }
    );
  }
  selectedFile:File;
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
}
