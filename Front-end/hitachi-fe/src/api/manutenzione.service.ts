// src/app/services/manutenzione.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { Manutenzione } from 'src/model/manutenzione';


@Injectable({
    providedIn: 'root'
})
export class ManutenzioneService {

    private apiUrl = 'http://localhost:8080/api/manutenzioni'; // URL backend
    private requestTimeout = 5000; // Timeout in ms (5 secondi)

    constructor(private http: HttpClient) { }

    // Recupera tutte le manutenzioni
    getAll(): Observable<Manutenzione[]> {
        return this.http.get<Manutenzione[]>(this.apiUrl)
            .pipe(
                timeout(this.requestTimeout),
                catchError(this.handleError)
            );
    }

    // Recupera manutenzione per ID
    getById(id: number): Observable<Manutenzione> {
        return this.http.get<Manutenzione>(`${this.apiUrl}/${id}`)
            .pipe(
                timeout(this.requestTimeout),
                catchError(this.handleError)
            );
    }

    getByUsername(username: string): Observable<Manutenzione[]> {
        if (!username) {
            // evita chiamate con username vuoto
            return throwError(() => new Error('Username non può essere vuoto'));
        }

        return this.http.get<Manutenzione[]>(`${this.apiUrl}/all/${username}`)
            .pipe(
                timeout(this.requestTimeout),  // timeout della richiesta
                catchError((error) => this.handleError(error)) // gestione centralizzata errori
            );
    }


    // Crea nuova manutenzione
    create(manutenzione: Manutenzione): Observable<Manutenzione> {
        return this.http.post<Manutenzione>(this.apiUrl, manutenzione)
            .pipe(
                timeout(this.requestTimeout),
                catchError(this.handleError)
            );
    }

    // Aggiorna manutenzione
    update(id: number, manutenzione: Manutenzione): Observable<Manutenzione> {
        return this.http.put<Manutenzione>(`${this.apiUrl}/${id}`, manutenzione)
            .pipe(
                timeout(this.requestTimeout),
                catchError(this.handleError)
            );
    }

    updateManutentata(id: number): Observable<Manutenzione> {
        const url = `${this.apiUrl}/manutentata/${id}`;
        return this.http.put<Manutenzione>(url, null, { withCredentials: true })
            .pipe(
                catchError(this.handleError)
            );
    }
    // Elimina manutenzione
    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`)
            .pipe(
                timeout(this.requestTimeout),
                catchError(this.handleError)
            );
    }

    // Gestione centralizzata errori
    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'Errore sconosciuto';

        if (error.error instanceof ErrorEvent) {
            // Errore lato client o di rete
            errorMessage = `Errore client: ${error.error.message}`;
        } else {
            // Errore lato server
            switch (error.status) {
                case 0:
                    errorMessage = 'Server non raggiungibile. Verifica la connessione.';
                    break;
                case 400:
                    errorMessage = 'Richiesta non valida (400).';
                    break;
                case 404:
                    errorMessage = 'Risorsa non trovata (404).';
                    break;
                case 500:
                    errorMessage = 'Errore interno del server (500).';
                    break;
                default:
                    errorMessage = `Errore ${error.status}: ${error.message}`;
            }
        }

        return throwError(() => new Error(errorMessage));
    }
}
