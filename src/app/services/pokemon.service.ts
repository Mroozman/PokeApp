import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/pokemon.model';
import { BehaviorSubject, Subject, Subscription, map } from 'rxjs';
import { Stats } from '../models/stats.model';
import { PokemonType } from '../models/pokemonType.model';
import { Move } from '../models/move.model';
import { Ability } from '../models/ability.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  public searchedPokemon = new Subject<Pokemon>();
  private listOfPkmnByColor: string[] = [];
  public listOfPokemonByColor = new Subject<string[]>();
  public searchByColor = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  public fetchPokemonByNameOrId(nameOrId: string): void {
    if (nameOrId !== null) {
      const url = 'https://pokeapi.co/api/v2/pokemon/' + nameOrId;
      this.http
        .get(url)
        .pipe(
          map((pokemon: any) => {
            const pok = new Pokemon(
              pokemon.id,
              pokemon.name,
              pokemon.height,
              pokemon.weight,
              [],
              [],
              pokemon.sprites.front_default,
              new Stats(
                pokemon.stats[0].base_stat,
                pokemon.stats[1].base_stat,
                pokemon.stats[2].base_stat,
                pokemon.stats[3].base_stat,
                pokemon.stats[4].base_stat,
                pokemon.stats[5].base_stat
              ),
              []
            );
            pokemon.abilities.forEach((ability) => {
              pok.abilities.push(
                new Ability(
                  ability.ability.name,
                  ability.ability.url,
                  ability.is_hidden
                )
              );
            });
            pokemon.moves.forEach((move) => {
              pok.moves.push(new Move(move.move.name, move.move.url));
            });
            pokemon.types.forEach((type) => {
              pok.type.push(new PokemonType(type.type.name));
            });
            return pok;
          })
        )
        .subscribe({
          next: (pokemon: Pokemon) => {
            this.searchedPokemon.next(pokemon);
            this.listOfPokemonByColor.next([pokemon.name]);
            this.listOfPkmnByColor = [pokemon.name];
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  public fetchPokemonByColor(color: string) {
    if (color !== null) {
      this.listOfPkmnByColor = [];
      const url = 'https://pokeapi.co/api/v2/pokemon-color/' + color;
      this.http
        .get(url)
        .pipe(
          map(
            (pokemonsByColor: {
              id: number;
              name: string;
              names: string[];
              pokemon_species: [{ name: string; url: string }];
            }) => {
              pokemonsByColor.pokemon_species.forEach((pokemon) => {
                this.listOfPkmnByColor.push(pokemon.name);
              });
            }
          )
        )
        .subscribe(() => {
          this.listOfPokemonByColor.next(this.listOfPkmnByColor);
          this.searchedPokemon.next(null);
        });
    }
  }

  public lookForPokemon(nameIdOrColor: string) {
    this.searchByColor.subscribe((byColor: boolean) => {
      if (byColor) {
        this.fetchPokemonByColor(nameIdOrColor);
      }
      if (!byColor) {
        this.fetchPokemonByNameOrId(nameIdOrColor);
      }
    });
  }
}
