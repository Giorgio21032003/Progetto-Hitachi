import { Dispositivo } from './dispositivi';
import { Manutenzione } from './manutenzione';

export interface DialogData {
  dispositivi: Dispositivo[];
  manutenzione: any;
  name: string;
}
