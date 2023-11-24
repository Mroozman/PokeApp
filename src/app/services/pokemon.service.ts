import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/pokemon.model';
import { BehaviorSubject, Subject, Subscription, catchError, map } from 'rxjs';
import { Stats } from '../models/stats.model';
import { PokemonType } from '../models/pokemonType.model';
import { Move } from '../models/move.model';
import { Ability } from '../models/ability.model';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { PokemonCacheService } from './pokemon-cache.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  public searchedPkmn: Pokemon;
  public searchedPokemon = new Subject<Pokemon>();
  private listOfPkmnByColor: string[] = [];
  public listOfPokemonByColor = new Subject<string[]>();
  public searchByColor = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private pokemonCacheService: PokemonCacheService
  ) {}

  public fetchPokemonByNameOrId(nameOrId: string): Pokemon {
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
            this.searchedPkmn = pokemon;
            this.searchedPkmn.height = this.searchedPkmn.height / 10;
            this.searchedPkmn.weight = this.searchedPkmn.weight / 10;
            this.searchedPokemon.next(this.searchedPkmn);
            this.listOfPokemonByColor.next([this.searchedPkmn.name]);
            this.listOfPkmnByColor = [this.searchedPkmn.name];
            this.pokemonCacheService.set(
              this.searchedPkmn.name,
              this.searchedPkmn
            );
          },
          error: (error) => {
            this.listOfPokemonByColor.next([]);
            this.listOfPkmnByColor = [];
            this.searchedPokemon.next(null);
          },
        });
      return this.searchedPkmn;
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
        .subscribe({
          next: () => {
            this.listOfPokemonByColor.next(this.listOfPkmnByColor);
            this.searchedPokemon.next(null);
          },
          error: (error) => {
            this.listOfPokemonByColor.next([]);
            this.listOfPkmnByColor = [];
            this.searchedPokemon.next(null);
          },
        });
    }
  }

  public lookForPokemon(nameIdOrColor: string) {
    this.searchByColor.subscribe((byColor: boolean) => {
      if (byColor) {
        this.fetchPokemonByColor(nameIdOrColor);
      }
      if (!byColor) {
        const cachedPokemon = this.pokemonCacheService.get(nameIdOrColor);
        if (cachedPokemon !== undefined) {
          this.searchedPkmn = cachedPokemon;
          this.searchedPokemon.next(this.searchedPkmn);
          this.listOfPokemonByColor.next([this.searchedPkmn.name]);
          this.listOfPkmnByColor = [this.searchedPkmn.name];
        } else {
          this.fetchPokemonByNameOrId(nameIdOrColor);
        }
      }
    });
  }

  public getSearchedPokemon(): Pokemon {
    if (this.searchedPkmn !== null || this.searchedPkmn !== undefined) {
      const copyOfSearchedPkmn = new Pokemon(
        this.searchedPkmn.id,
        this.searchedPkmn.name,
        this.searchedPkmn.height,
        this.searchedPkmn.weight,
        this.searchedPkmn.abilities,
        this.searchedPkmn.moves,
        this.searchedPkmn.sprite,
        this.searchedPkmn.stats,
        this.searchedPkmn.type
      );
      return copyOfSearchedPkmn;
    } else {
      return null;
    }
  }
}

export const resolvePokemonData: ResolveFn<Pokemon> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const cachedPokemon = inject(PokemonCacheService).get(
    route.params['pokemon']
  );
  if (cachedPokemon !== undefined) {
    return cachedPokemon;
  } else {
    inject(PokemonService).fetchPokemonByNameOrId(route.params['pokemon']);
    return inject(PokemonService).getSearchedPokemon();
  }
};
