import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, debounceTime, pipe, takeWhile } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  private subscriptionStore: Subscription = new Subscription();
  public searchBarForm: FormGroup;

  constructor(private pokemonService: PokemonService) {}

  public ngOnInit(): void {
    this.searchBarForm = new FormGroup({
      pokemonInput: new FormControl(null),
    });

    this.subscriptionStore.add(
      this.searchBarForm.valueChanges.pipe(debounceTime(800)).subscribe({
        next: () => {
          this.pokemonService.fetchPokemonByNameOrId(
            this.searchBarForm.get('pokemonInput').value
          );
        },
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptionStore.unsubscribe();
  }
}