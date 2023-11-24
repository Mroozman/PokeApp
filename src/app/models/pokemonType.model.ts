export class PokemonType {
  constructor(
    public name: string,
    public double_dmg_from?: string[],
    public half_dmg_from?: string[],
    public no_dmg_from?: string[],
    public double_dmg_to?: string[],
    public half_dmg_to?: string[],
    public no_dmg_to?: string[]
  ) {}
}
