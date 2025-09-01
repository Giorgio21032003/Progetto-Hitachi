import { Dispositivo } from "./dispositivi";

export interface Manutenzione {
  id: number | null;
  descrizione: string;
  dataManutenzione: Date;
  dispositivo: Dispositivo;
  eseguitoDa: string;
  stato: string;
}


export interface ManutenzioneTable {
  motivazione: string;
  dataManutenzione: Date;
  nomeDispositivo: string;
  tipologiaDispositivo: string;
  stato: string,
  id: number
}
