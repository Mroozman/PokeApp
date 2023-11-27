import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params } from '@angular/router';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public pokemonData: Pokemon;
  public isLoading: boolean = true;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.pokemonData = data['pokemon'];
      if (this.pokemonData !== undefined) {
        this.isLoading = false;
      }
    });
  }

  public calculateStatsSum(): number {
    return (
      this.pokemonData.stats.HP +
      this.pokemonData.stats.Speed +
      this.pokemonData.stats.Attack +
      this.pokemonData.stats.Defense +
      this.pokemonData.stats.SpAttack +
      this.pokemonData.stats.SpDefense
    );
  }
}
