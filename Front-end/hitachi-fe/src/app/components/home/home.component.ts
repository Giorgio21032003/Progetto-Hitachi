import { DispositivoService } from './../../../api/dispositivo.service';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Dispositivo } from 'src/model/dispositivi';
import { ModaleDispositiviComponent } from '../modale-dispositivi/modale-dispositivi.component';
import { Manutenzione, ManutenzioneTable } from 'src/model/manutenzione';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // 👍 colonne coerenti con la tua interfaccia
  displayedColumns: string[] = ['nomeDispositivo', 'tipologiaDispositivo', 'stato', 'dataManutenzione', 'motivazione', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() dispositiviRimanenti: Dispositivo[] = [];

  @Input() dataSource!: MatTableDataSource<ManutenzioneTable>;
  @Input() spinnerFlag!: boolean;
  @Output() saveManutenzioneEmitter: EventEmitter<Manutenzione> = new EventEmitter<Manutenzione>();
  @Output() deleteManutenzioneEmitter: EventEmitter<Manutenzione> = new EventEmitter<Manutenzione>();
  @Output() updateManutenzioneEmitter: EventEmitter<Manutenzione> = new EventEmitter<Manutenzione>();
  @Output() manutentaManutenzioneEmitter: EventEmitter<Manutenzione> = new EventEmitter<Manutenzione>();

  constructor(private dialog: MatDialog, private dispositivoService: DispositivoService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource'] && changes['dataSource'].currentValue !== undefined) {
      console.log('sono entrato');
      setTimeout(() => {
        this.paginator.pageSize = 10;
        this.dataSource.paginator = this.paginator;

      });

    }
  }


  ngOnInit() {
  }

  selectedElement: any;

  edit(element: any) {
    this.updateManutenzioneEmitter.emit(element);
  }

  delete(element: any) {
    this.deleteManutenzioneEmitter.emit(element);
  }

  manutenta(element: any) {
    this.manutentaManutenzioneEmitter.emit(element);
  }



  aggiungiManutenzione() {
    const dialogRef = this.dialog.open(ModaleDispositiviComponent, {
      data: { name: 'NUOVA MANUTENZIONE', dispositivi: this.dispositiviRimanenti, manutenzione: null },
      width: '75%',
      height: '80%',
      maxWidth: '95vw',
      panelClass: 'no-scroll-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.saveManutenzioneEmitter.emit(result);
      }
    });
  }

}
