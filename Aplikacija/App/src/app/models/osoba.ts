import { Korisnik } from './korisnik';

export interface Osoba extends Korisnik {
  JMBG?: string;
  Ime?: string;
  Prezime?: string;
  DatRodjenja?: Date;
  Pol?: string;
  BrRacuna?: string;
}
