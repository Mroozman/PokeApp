import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/pokemon.model';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { Stats } from '../models/stats.model';
import { Move } from '../models/move.model';
import { Ability } from '../models/ability.model';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { PokemonCacheService } from './pokemon-cache.service';
import { TypeService } from './type.service';

class PokemonFromApi {
  constructor(
    public id: number,
    public name: string,
    public height: number,
    public weight: number,
    public abilities: {
      ability: { name: string; url: string; is_hidden: boolean };
    }[],
    public moves: { move: { name: string; url: string } }[],
    public sprites: { front_default: string },
    public stats: { base_stat: number }[],
    public types: { type: { name: string } }[]
  ) {}
}

class PokemonByColorFromApi {
  public id: number;
  public name: string;
  public names: string[];
  public pokemon_species: { name: string; url: string }[];
}

class AbilityEffectFromApi {
  public effect_entries: { language: { name: string }; short_effect: string }[];
}

class AllPokemonsFromApi {
  public count: number;
  public next: string;
  public previous: string;
  public results: { name: string; url: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private listOfPkmnByColor: string[] = [];
  public searchedPkmn: Pokemon;
  public searchedPokemon = new Subject<Pokemon>();
  public listOfPokemonByColor = new Subject<string[]>();
  public searchByColor = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private pokemonCacheService: PokemonCacheService,
    private typeService: TypeService
  ) {}

  public fetchPokemonByNameOrId(nameOrId: string): void {
    if (nameOrId !== null) {
      const url = 'https://pokeapi.co/api/v2/pokemon/' + nameOrId;
      this.http
        .get<PokemonFromApi>(url)
        .pipe(
          map((pokemon) => {
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
                  ability.ability.is_hidden,
                  'No effect'
                )
              );
            });
            pokemon.moves.forEach((move) => {
              pok.moves.push(new Move(move.move.name, move.move.url));
            });
            pokemon.types.forEach((type) => {
              pok.type.push(this.typeService.get(type.type.name));
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
          error: (error: Error) => {
            this.listOfPokemonByColor.next([]);
            this.listOfPkmnByColor = [];
            this.searchedPokemon.next(null);
          },
        });
    }
  }

  public fetchPokemonFromApi(nameOrId: string): Observable<Pokemon> {
    if (nameOrId !== null) {
      const url = 'https://pokeapi.co/api/v2/pokemon/' + nameOrId;
      return this.http.get<PokemonFromApi>(url).pipe(
        map((pokemon) => {
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
                ability.ability.is_hidden,
                'No effect'
              )
            );
          });
          pokemon.moves.forEach((move) => {
            pok.moves.push(new Move(move.move.name, move.move.url));
          });
          pokemon.types.forEach((type) => {
            pok.type.push(this.typeService.get(type.type.name));
          });
          this.searchedPkmn = pok;
          this.searchedPokemon.next(this.searchedPkmn);
          return pok;
        })
      );
    }
  }

  public fetchPokemonByColor(color: string): void {
    if (color !== null) {
      this.listOfPkmnByColor = [];
      const url = 'https://pokeapi.co/api/v2/pokemon-color/' + color;
      this.http
        .get<PokemonByColorFromApi>(url)
        .pipe(
          map((pokemonsByColor) => {
            pokemonsByColor.pokemon_species.forEach((pokemon) => {
              this.listOfPkmnByColor.push(pokemon.name);
            });
          })
        )
        .subscribe({
          next: () => {
            this.listOfPokemonByColor.next(this.listOfPkmnByColor);
            this.searchedPokemon.next(null);
          },
          error: (error: Error) => {
            this.listOfPokemonByColor.next([]);
            this.listOfPkmnByColor = [];
            this.searchedPokemon.next(null);
          },
        });
    }
  }

  public lookForPokemon(nameIdOrColor: string): void {
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

  public fetchAbilityEffect(
    abilityName: string
  ): Observable<AbilityEffectFromApi> {
    return this.http.get<AbilityEffectFromApi>(
      'https://pokeapi.co/api/v2/ability/' + abilityName
    );
  }

  public cacheAbilityEffect(abilityName: string, abilityEffect: string): void {
    const index = this.searchedPkmn.abilities.findIndex(
      (abilityToFind) => abilityToFind.name === abilityName
    );
    this.searchedPkmn.abilities[index].effect = abilityEffect;
    this.searchedPokemon.next(this.searchedPkmn);
    this.pokemonCacheService.set(this.searchedPkmn.name, this.searchedPkmn);
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

  public fetchListOfAllPokemon(): Observable<AllPokemonsFromApi> {
    return this.http.get<AllPokemonsFromApi>(
      'https://pokeapi.co/api/v2/pokemon?limit=1291'
    );
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
    return inject(PokemonService).fetchPokemonFromApi(route.params['pokemon']);
  }
};
