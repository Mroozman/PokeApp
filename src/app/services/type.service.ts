import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { PokemonType } from '../models/pokemonType.model';

class damageRelations {
  double_damage_from: { name: string; url: string }[];
  double_damage_to: { name: string; url: string }[];
  half_damage_from: { name: string; url: string }[];
  half_damage_to: { name: string; url: string }[];
  no_damage_from: { name: string; url: string }[];
  no_damage_to: { name: string; url: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  private pokemonTypes = new Map<string, PokemonType>();
  private pokemonTypeNames: string[] = [
    'normal',
    'fire',
    'water',
    'electric',
    'grass',
    'ice',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ghost',
    'dragon',
    'dark',
    'steel',
    'fairy',
  ];

  constructor(private http: HttpClient) {}

  public getTypesFormApi() {
    this.pokemonTypeNames.forEach((type: string) => {
      const url = 'https://pokeapi.co/api/v2/type/' + type;
      this.http
        .get(url)
        .pipe(
          tap((typeFormApi: any) => {
            const dmgRelations: damageRelations = typeFormApi.damage_relations;

            let doubleDamageFrom: string[] = [];
            dmgRelations.double_damage_from.forEach((double_from) => {
              doubleDamageFrom.push(double_from.name);
            });
            let doubleDamageTo: string[] = [];
            dmgRelations.double_damage_to.forEach((double_to) => {
              doubleDamageTo.push(double_to.name);
            });
            let halfDamageFrom: string[] = [];
            dmgRelations.half_damage_from.forEach((half_from) => {
              halfDamageFrom.push(half_from.name);
            });
            let halfDamageTo: string[] = [];
            dmgRelations.half_damage_to.forEach((half_to) => {
              halfDamageTo.push(half_to.name);
            });
            let noDamageFrom: string[] = [];
            dmgRelations.no_damage_from.forEach((no_from) => {
              noDamageFrom.push(no_from.name);
            });
            let noDamageTo: string[] = [];
            dmgRelations.no_damage_to.forEach((no_to) => {
              noDamageTo.push(no_to.name);
            });
            const pokemonType = new PokemonType(
              typeFormApi.name,
              doubleDamageFrom,
              halfDamageFrom,
              noDamageFrom,
              doubleDamageTo,
              halfDamageTo,
              noDamageTo
            );
            this.set(typeFormApi.name, pokemonType);
          })
        )
        .subscribe();
    });
  }

  set(key: string, data: PokemonType): void {
    if (this.pokemonTypes.has(key)) {
      return;
    }
    this.pokemonTypes.set(key, data);
  }

  get(key: string): PokemonType {
    const data = this.pokemonTypes.get(key);
    return data;
  }
}
