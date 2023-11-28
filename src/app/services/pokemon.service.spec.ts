import { TestBed } from '@angular/core/testing';

import { PokemonService } from './pokemon.service';
import { Pokemon } from '../models/pokemon.model';
import { Ability } from '../models/ability.model';
import { MoveDetail } from '../models/moveDetail';
import { TypeService } from './type.service';
import { Stats } from '../models/stats.model';
import { Move } from '../models/move.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PokemonService', () => {
  let service: PokemonService;
  let typeService: TypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PokemonService);
    typeService = TestBed.inject(TypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a correct Pokemon', () => {
    service.searchedPkmn = new Pokemon(
      1,
      'testasaur',
      10,
      10,
      [new Ability('testability', 'some url', false, 'no effect')],
      [
        new Move('testatack', 'url to details'),
        new Move('testbeam', 'url to details'),
      ],
      'url to sprite',
      new Stats(100, 10, 20, 30, 40, 50),
      [typeService.get('normal')]
    );
    const pokemonFromService = service.getSearchedPokemon();
    expect(pokemonFromService.name).toBe('testasaur');
  });
});
