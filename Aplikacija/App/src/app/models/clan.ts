import { Osoba } from './osoba';

export interface Clan extends Osoba {
  TrenerID?: number;
  GrupaID?: number;
  Cilj?: string;
  DatUclanjivanja?: Date;
  PlanTrID?: number;
  PlanIsID?: number;
}
