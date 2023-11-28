import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  private subscriptionStore: Subscription = new Subscription();
  public searchBarForm: FormGroup;
  public lastColorSearch: boolean = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.searchBarForm = new FormGroup({
      pokemonInput: new FormControl(null),
    });

    this.subscriptionStore.add(
      this.searchBarForm.valueChanges.pipe(debounceTime(800)).subscribe({
        next: () => {
          const pkmnlookingFor: string =
            this.searchBarForm.get('pokemonInput').value;
          this.pokemonService.lookForPokemon(pkmnlookingFor);
        },
      })
    );

    this.subscriptionStore.add(
      this.pokemonService.searchByColor.subscribe((isColorSearch: boolean) => {
        if (this.lastColorSearch !== isColorSearch) {
          this.searchBarForm.reset();
        }
        this.lastColorSearch = isColorSearch;
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptionStore.unsubscribe();
  }
}
