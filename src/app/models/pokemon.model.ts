import { Ability } from './ability.model';
import { Move } from './move.model';
import { PokemonType } from './pokemonType.model';
import { Stats } from './stats.model';

export class Pokemon {
  constructor(
    public id: number,
    public name: string,
    public height: number,
    public weight: number,
    public abilities: Ability[],
    public moves: Move[],
    public sprite: string,
    public stats: Stats,
    public type: PokemonType[]
  ) {}
}
