export class PokemonType {
  constructor(
    public name: string,
    public double_dmg_from: PokemonType,
    public half_dmg_from: PokemonType,
    public no_dmg_from: PokemonType,
    public double_dmg_to: PokemonType,
    public half_dmg_to: PokemonType,
    public no_dmg_to: PokemonType
  ) {}
}
