import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public listOfPokemonNames: { name: string; url: string }[] = [];

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    const storedNames = JSON.parse(localStorage.getItem('pokemonNames'));
    if (storedNames === undefined || storedNames === null) {
      this.pokemonService.fetchListOfAllPokemon().subscribe((pokemons) => {
        this.listOfPokemonNames = pokemons.results;
        localStorage.setItem('pokemonNames', JSON.stringify(pokemons.results));
      });
    } else {
      this.listOfPokemonNames = storedNames;
    }
  }

  public onPokemonClick(pokemonName: string): void {
    this.router.navigate(['details', pokemonName]);
  }
}
