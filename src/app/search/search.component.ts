import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  private subscriptionStore = new Subscription();

  constructor(private pokemonService: PokemonService) {}

  public searchByColor = false;

  ngOnInit(): void {
    this.subscriptionStore.add(
      this.pokemonService.searchByColor.subscribe((isColorSearch: boolean) => {
        this.searchByColor = isColorSearch;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptionStore.unsubscribe();
  }

  public onNameOrIdSearch(): void {
    this.pokemonService.searchByColor.next(false);
  }

  public onColorSearch(): void {
    this.pokemonService.searchByColor.next(true);
  }
}
