import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Subscription } from 'rxjs';
import { UtenteService } from 'src/api/utente.service';


@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  loginFailed: boolean = false;
  private storageSub!: Subscription;

  constructor(private router: Router, private utenteService: UtenteService, private snackBar: MatSnackBar, private storage: StorageMap) { }

  ngOnInit() { }

  login($event) {
    this.utenteService.login($event.username, $event.password).subscribe({
      next: (utente) => {
        if (utente) {
          this.loginFailed = false;
          this.storageSub = this.storage.set('utente', utente).subscribe(() => {
            this.router.navigate(['/home']);
          });
        } else {
          this.loginFailed = true;
          this.snackBar.open('Login fallita: credenziali errate', 'Chiudi', {
            duration: 3000, // durata in millisecondi
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'snackbar-error'
          });
        }
      },
      error: (err) => {
        // this.error = err.message || 'Login fallito';
        this.loginFailed = true;
        this.snackBar.open('Login fallita: credenziali errate', 'Chiudi', {
          duration: 100000000, // durata in millisecondi
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'snackbar-error'
        });

      }
    });
  }

  ngOnDestroy(): void {
    if (this.storageSub) {
      this.storageSub.unsubscribe();
    }
  }

}
