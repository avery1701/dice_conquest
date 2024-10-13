export interface Monster {
  id: number;
  name: string;
  lifePoints: number;
  maxLifePoints: number;
  damageRating: number;
}

export interface Wizard {
  lifePoints: number;
  maxLifePoints: number;
}

export type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20';

export interface DiceRoll {
  type: DiceType;
  value: number;
}