export interface Dispositivo {
  id: number;
  nome: string;
  stato: string;
  posizione?: string;
  tipoDispositivo: TipoDispositivo;
  creatoIl?: string;
}

export interface TipoDispositivo {
  id: number;
  nome: string;
  descrizione?: string;
}


