import { PokemonType } from './pokemonType.model';

export class MoveDetail {
  constructor(
    public name: string,
    public attackType: string,
    public accuracy: number,
    public type: PokemonType,
    public description: string,
    public power?: number
  ) {}
}
