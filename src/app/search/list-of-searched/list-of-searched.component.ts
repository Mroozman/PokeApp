import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, concatMap } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-list-of-searched',
  templateUrl: './list-of-searched.component.html',
  styleUrls: ['./list-of-searched.component.scss'],
})
export class ListOfSearchedComponent implements OnInit, OnDestroy {
  private subscriptionStore = new Subscription();
  public listOfFindedPokemon: string[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.subscriptionStore.add(
      this.pokemonService.listOfPokemonByColor.subscribe(
        (pokemons: string[]) => {
          this.listOfFindedPokemon = [];
          this.listOfFindedPokemon.push(...pokemons);
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptionStore.unsubscribe();
  }
}
