import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-list-of-searched',
  templateUrl: './list-of-searched.component.html',
  styleUrls: ['./list-of-searched.component.scss'],
})
export class ListOfSearchedComponent implements OnInit, OnDestroy {
  private subscriptionStore = new Subscription();
  public listOfFindedPokemon: string[] = [];
  public noPokemonsMessage: string = 'No pokemons found!';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.subscriptionStore.add(
      this.pokemonService.listOfPokemonByColor.subscribe(
        (pokemons: string[]) => {
          if (pokemons.length > 0) {
            this.noPokemonsMessage = '';
            this.listOfFindedPokemon = [];
            this.listOfFindedPokemon.push(...pokemons);
          } else {
            this.noPokemonsMessage = 'No pokemons found!';
          }
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptionStore.unsubscribe();
  }
}
