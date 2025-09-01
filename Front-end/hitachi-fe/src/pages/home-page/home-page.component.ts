import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Subscription } from 'rxjs';
import { DispositivoService } from 'src/api/dispositivo.service';
import { ManutenzioneService } from 'src/api/manutenzione.service';
import { ModaleDispositiviComponent } from 'src/app/components/modale-dispositivi/modale-dispositivi.component';
import { Dispositivo } from 'src/model/dispositivi';
import { Manutenzione, ManutenzioneTable } from 'src/model/manutenzione';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy, AfterViewInit {



  isLogged: boolean = true;
  storageSub!: Subscription;
  utente: any;
  dataSource: MatTableDataSource<ManutenzioneTable>;
  spinnerFlag: boolean = false;
  dispositiviRimanenti: Dispositivo[] = [];

  constructor(private dialog: MatDialog, private router: Router, private route: ActivatedRoute, private storage: StorageMap, private manutenzioneService: ManutenzioneService, private dispositivoService: DispositivoService) { }

  ngOnInit() {

    this.storageSub = this.storage.get('utente').subscribe((value) => {
      if (value === null || value === undefined) {
        this.router.navigate(['/login']);
      } else {
        this.utente = value;
        this.spinnerFlag = true;
        this.getDispositiviRimanenti();

      }
    });

  }

  getDispositiviRimanenti() {
    this.dispositivoService.findAll().subscribe((val) => {
      this.dispositiviRimanenti = val;
      this.getManutenzioneUtente();
    });
  }

  ngAfterViewInit(): void {
  }

  getManutenzioneUtente() {
    this.manutenzioneService.getByUsername(this.utente.username).subscribe({
      next: (res) => {
        let manutenzioneTable: ManutenzioneTable[] = [];

        res.forEach((manutenzione: Manutenzione) => {
          let manutenzioneVar: ManutenzioneTable = {
            id: manutenzione.id,
            motivazione: manutenzione.descrizione,
            dataManutenzione: manutenzione.dataManutenzione,
            nomeDispositivo: manutenzione.dispositivo.nome,
            tipologiaDispositivo: manutenzione.dispositivo.tipoDispositivo.nome,
            stato: manutenzione.stato
          }
          manutenzioneTable.push(manutenzioneVar);
        });

        this.dataSource = new MatTableDataSource<ManutenzioneTable>(manutenzioneTable);
        this.spinnerFlag = false;
      },
      error: (err) => {
        this.spinnerFlag = false;
        console.log('Errore nel salvataggio della manutenzione');
      }
    });
  }


  manutentaManutenzione(manutenzione: Manutenzione) {
    this.manutenzioneService.updateManutentata(manutenzione.id).subscribe({
      next: (res) => {
        console.log('Manutenzione Salvata');
        this.spinnerFlag = true;
        this.getManutenzioneUtente();
      },
      error: (err) => {
        console.log('Errore nel salvataggio della manutenzione');
      }
    });
  }


  deleteManutenzione(manutenzione: Manutenzione) {
    this.spinnerFlag = true;
    this.manutenzioneService.delete(manutenzione.id).subscribe({
      next: (res) => {
        console.log('Manutenzione Cancellat');
        this.getManutenzioneUtente();
      },
      error: (err) => {
        this.spinnerFlag = false;
        console.log('Errore nel salvataggio della manutenzione');
      }
    });
  }

  updateManutenzione(manutenzione: Manutenzione) {
    const dialogRef = this.dialog.open(ModaleDispositiviComponent, {
      data: { name: 'MODIFICA MANUTENZIONE', dispositivi: this.dispositiviRimanenti, manutenzione: manutenzione },
      width: '75%',
      height: '80%',
      maxWidth: '95vw',
      panelClass: 'no-scroll-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.manutenzioneService.update(result.id, result).subscribe({
          next: (res) => {
            console.log('Manutenzione Salvata');
            this.spinnerFlag = true;
            this.getManutenzioneUtente();
          },
          error: (err) => {
            console.log('Errore nel salvataggio della manutenzione');
          }
        });
      }
    });
  }

  saveManutenzione(manutenzione: Manutenzione) {
    this.manutenzioneService.create(manutenzione).subscribe({
      next: (res) => {
        console.log('Manutenzione Salvata');
        this.spinnerFlag = true;
        this.getManutenzioneUtente();
      },
      error: (err) => {
        console.log('Errore nel salvataggio della manutenzione');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.storageSub) {
      this.storageSub.unsubscribe();
    }
  }

}
