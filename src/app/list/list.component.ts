import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public listOfPokemonNames: [name: string, url: string] = ['', ''];

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.pokemonService
      .fetchListOfAllPokemon()
      .subscribe((pokemons) => (this.listOfPokemonNames = pokemons.results));
  }

  public onPokemonClick(pokemonName: string) {
    this.router.navigate(['details', pokemonName]);
  }
}
