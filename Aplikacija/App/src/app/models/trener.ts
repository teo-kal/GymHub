import { Osoba } from './osoba';

export interface Trener extends Osoba {
  Zvanje?: string;
  Specijalizacija?: string;
  GodIskustva?: number;
  DatZaposljenja?: Date;
  Ocena?: number;
  BrPersTreninga?: number;
  RadnoVreme?: string;
}
