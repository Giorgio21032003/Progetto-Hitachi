import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Utente } from 'src/model/utente';

import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnChanges {

  @Input() loginFailed: boolean = false;
  @Output() loginEmitter: EventEmitter<Utente> = new EventEmitter<Utente>();

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loginFailed'] && this.loginFailed) {
      this.errorMessage = 'Credenziali errate.';
      this.loginForm.get('username')?.setValue(null);
      this.loginForm.get('password')?.setValue(null);
      this.loginFailed = false;
    }
  }



  loginEmit() {
    const utente = {
      id: null,
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    }
    this.loginEmitter.emit(utente);
  }

  ngOnInit() {
  }

}
