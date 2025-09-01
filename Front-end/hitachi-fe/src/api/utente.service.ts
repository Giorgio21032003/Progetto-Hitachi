import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, retry, throwError, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utente } from 'src/model/utente';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<Utente> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.get<Utente>(`${environment.apiUrl}/utenti/login`, { params }).pipe(
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
