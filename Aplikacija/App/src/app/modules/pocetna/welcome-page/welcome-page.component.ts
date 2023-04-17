import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from 'src/app/shared/_modal';
import { UserLoginDto } from 'src/app/models/userLoginDto';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserLoginResponse } from 'src/app/models/userLoginResponse';
import { UserRegisterDto } from 'src/app/models/userRegisterDto';
import { Clan } from 'src/app/models/clan';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent implements OnInit {
  closeResult: string;
  constructor(
    public modalService: ModalService,
    private router: Router,
    private toastrService: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  ciljevi = [
    {
      name: 'Smršam',
      value: 'Mršavljenje',
    },
    {
      name: 'Nabacim mišićnu masu',
      value: 'Dobijanje mišićne mase',
    },
    {
      name: 'Održavam i zategnem liniju',
      value: 'Održavanje figure',
    },
  ];

  pols = [
    {
      name: 'Muški',
      value: 'M',
    },
    {
      name: 'Ženski',
      value: 'Z',
    },
  ];

  KorisnickoIme: string;
  Lozinka: string;

  confirmLozinka: string;

  login(f: NgForm): void {
    const userLoginDto: UserLoginDto = Object.assign({}, f.value);
    console.log(userLoginDto);
    if (!f.valid) return;

    this.authService.login(userLoginDto).subscribe(
      (response: any) => {
        const loginResponse: UserLoginResponse = Object.assign({}, response);
        setTimeout(() => {
          localStorage.setItem('visited', 'true');
          switch (loginResponse.tipKorisnika) {
            case 'A':
              {
                this.router.navigate(['/admin']);
              }
              break;
            case 'C':
              {
                this.router.navigate(['/clan']);
              }
              break;
            case 'T':
              {
                this.router.navigate(['/trener']);
              }
              break;
            default:
              this.router.navigate(['/']);
          }
        });
      },
      () => {
        this.toastrService.error(
          'Pogrešno ste uneli korisničko ime i/ili šifru',
          'Error'
        );
      }
    );
  }
  osobaRegister: Clan = {};
  register(f: NgForm): void {
    let danas = new Date(Date.now());
    if(danas.getFullYear() - this.osobaRegister.DatRodjenja.getFullYear() > 16){
      if (this.osobaRegister.Lozinka == this.confirmLozinka) {
        if (!f.valid) {
          this.toastrService.error(
            'Došlo je do greške, forma mora biti validna',
            'Error'
          );
        }
        console.log(this.osobaRegister);
        const userRegister: UserRegisterDto = Object.assign(
          {},
          this.osobaRegister
        );
        console.log(userRegister);
        this.authService.register(userRegister).subscribe((response) => {
          setTimeout(() => {
            localStorage.removeItem('visited');
            this.router.navigate(['/clan']);
          });
        });
      } else this.toastrService.error('Lozinka mora biti ista', 'Error');
    }
    else{
       this.toastrService.error('Morate imati više od 16 godina', 'Error');
    }
  }

  Email: string;
  Ime: string;
  Prezime: string;
  Tekst: string;
  Naslov: string;

  posaljiMejl() {
    let objZaSlanje = {
      Email: this.Email,
      Ime: this.Ime,
      Prezime: this.Prezime,
      Tekst: this.Tekst,
      Naslov: this.Naslov,
    };
    this.authService.posaljiMejl(objZaSlanje).subscribe(
      () => {
        this.toastrService.success(
          'Vaša poruka je poslata, uskoro ćete dobiti odgovor od našeg tima',
          'Success'
        );
      },
      () => {
        this.toastrService.error(
          'Došlo je do greške, pokušajte ponovo',
          'Error'
        );
      }
    );
  }
}
