import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
  email: string;
  kod: string;
  kodNas: string;
  mejlPoslat = false;
  kodSuccess = false;
  lozinka: string;
  lozinkaConfirm: string;
  posaljiMejl() {
    this.kodNas = this.napraviKod(5);
    this.authService.sendResetEmail(this.email, this.kodNas).subscribe(
      () => {
        this.toastrService.success('Email poslat', 'Success');
        document.getElementById('buttonSubmitEmail').hidden = true;
        this.mejlPoslat = true;
      },
      () => {
        this.toastrService.error('Greška pri slanju email-a', 'Error');
      }
    );
  }

  napraviKod(length) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  potvrdiKod() {
    if (this.kod === this.kodNas) {
      document.getElementById('buttonSubmitKod').hidden = true;
      this.kodSuccess = true;
    } else this.toastrService.error('Uneli ste pogresan kod', 'Error');
  }

  resetLozinka() {
    if (this.lozinka === this.lozinkaConfirm) {
      this.authService.resetPassword(this.email, this.lozinka).subscribe(() => {
        this.toastrService.success('Lozinka promenjena', 'Success');
        setTimeout(() => {
          this.router.navigate(['']);
        });
      },()=>{
        this.toastrService.error('Greška pri resetovanju lozinke', 'Error');
      });
    } else this.toastrService.error('Lozinke se ne poklapaju', 'Error');
  }
}
