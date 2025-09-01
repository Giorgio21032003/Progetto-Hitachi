import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Subscription } from 'rxjs';
import { DialogData } from 'src/model/common';
import { Dispositivo } from 'src/model/dispositivi';
import { Manutenzione } from 'src/model/manutenzione';

@Component({
  selector: 'app-modale-dispositivi',
  standalone: false,
  templateUrl: './modale-dispositivi.component.html',
  styleUrls: ['./modale-dispositivi.component.css']
})
export class ModaleDispositiviComponent implements OnInit, OnDestroy {

  readonly dialogRef = inject(MatDialogRef<ModaleDispositiviComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  formManutenzione!: FormGroup;

  descrizioneTipologia: string | null = null;
  nomeTipologia: string | null = null;
  dispositivi: Dispositivo[] = [];
  dispositivoSelected: Dispositivo;
  descrizioneMotivazione: string = '';
  titolo: string = '';
  storageSub!: Subscription;
  utente: any;

  constructor(private storage: StorageMap) {
    this.titolo = this.data.name;
    this.formManutenzione = new FormGroup({
      descrizione: new FormControl({ value: '', disabled: true }), // disabilitato
      nome: new FormControl('', Validators.required),              // required
      tipologia: new FormControl({ value: '', disabled: true }),   // disabilitato
      motivazione: new FormControl('')
    });

  }

  ngOnDestroy(): void {
    this.storageSub.unsubscribe();
  }

  ngOnInit(): void {
    this.storageSub = this.storage.get('utente').subscribe((value) => {
      this.utente = value;
      this.dispositivi = this.data.dispositivi;
      if (this.data.manutenzione) {
        this.formManutenzione.get('nome').setValue(this.data.manutenzione.nomeDispositivo);
        this.formManutenzione.get('motivazione').setValue(this.data.manutenzione.motivazione);
        this.onDispositivoChange(this.data.manutenzione.nomeDispositivo);
      }
    });

  }

  onDispositivoChange(nomeDispositivo: any) {
    this.dispositivoSelected = this.dispositivi.find(x => x.nome === nomeDispositivo || x.nome === this.formManutenzione.get('nome').value);
    this.formManutenzione.get('descrizione').setValue(this.dispositivoSelected.tipoDispositivo.descrizione);
    this.formManutenzione.get('tipologia').setValue(this.dispositivoSelected.tipoDispositivo.nome);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  salvaManutenzione() {
    if (!this.dispositivoSelected) {
      this.dispositivoSelected = this.dispositivi.find(x => x.nome === this.formManutenzione.get('nome').value);
    }

    const manutenzione: Manutenzione = {
      id: this.data.manutenzione?.id ?? null,
      descrizione: this.formManutenzione.get('motivazione').value ?? '',
      dataManutenzione: new Date,
      dispositivo: this.dispositivoSelected,
      eseguitoDa: this.utente.username,
      stato: 'In manutenzione'
    }
    this.dialogRef.close(manutenzione);
  }
}
