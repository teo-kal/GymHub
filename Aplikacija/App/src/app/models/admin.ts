import { Korisnik } from './korisnik';

export interface Admin extends Korisnik {
  Dostupnost?: string;
}
