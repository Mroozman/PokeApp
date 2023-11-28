import { Component, Input, OnInit } from '@angular/core';
import { Ability } from 'src/app/models/ability.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-ability-details',
  templateUrl: './ability-details.component.html',
  styleUrls: ['./ability-details.component.scss'],
})
export class AbilityDetailsComponent implements OnInit {
  @Input() ability: Ability;
  public abilityToShow: Ability;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    const storedAbility: Ability = JSON.parse(
      localStorage.getItem(this.ability.name)
    );
    if (storedAbility !== null) {
      this.abilityToShow = storedAbility;
    } else {
      this.abilityToShow = this.ability;
      if (this.abilityToShow.effect === 'No effect') {
        this.pokemonService
          .fetchAbilityEffect(this.ability.name)
          .subscribe((abilityData) => {
            if (abilityData.effect_entries.length >= 1) {
              abilityData.effect_entries.forEach((entry) => {
                if (entry.language.name === 'en') {
                  this.abilityToShow.effect = entry.short_effect;
                  localStorage.setItem(
                    this.abilityToShow.name,
                    JSON.stringify(this.abilityToShow)
                  );
                  this.pokemonService.cacheAbilityEffect(
                    this.abilityToShow.name,
                    this.abilityToShow.effect
                  );
                }
              });
            }
          });
      }
    }
  }
}
