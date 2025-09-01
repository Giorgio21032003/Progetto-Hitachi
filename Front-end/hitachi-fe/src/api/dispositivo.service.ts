import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timeout, retry, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Dispositivo } from 'src/model/dispositivi';
import { Utente } from 'src/model/utente';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  constructor(private http: HttpClient) { }



  findAll(): Observable<Dispositivo[]> {

    return this.http.get<Dispositivo[]>(`${environment.apiUrl}/dispositivi/attivi`).pipe(
      timeout(5000), // timeout di 5 secondi
      retry(2),      // riprova 2 volte in caso di errore
      catchError(err => {
        // Puoi personalizzare il messaggio o il tipo di errore
        let errorMsg = 'Errore sconosciuto';
        if (err.name === 'TimeoutError') {
          errorMsg = 'Timeout: il server non risponde';
        } else if (err.status === 0) {
          errorMsg = 'Errore di connessione al server';
        } else if (err.status >= 400) {
          errorMsg = `Errore HTTP ${err.status}`;
        }
        // Passa l’errore all’osservabile
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}
