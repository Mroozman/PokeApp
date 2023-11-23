import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { MoveDetail } from '../models/moveDetail';
import { PokemonType } from '../models/pokemonType.model';

@Injectable({
  providedIn: 'root',
})
export class MoveService {
  constructor(private http: HttpClient) {}

  getMoveByNameOrId(url: string) {
    return this.http.get(url).pipe(
      map((moveFromApi: any) => {
        const name = moveFromApi.name.replace('-', ' ');
        console.log(name);
        let description: string = 'No special effect';

        if (moveFromApi.effect_entries.length > 0) {
          description = moveFromApi.effect_entries[0].short_effect;
          if (moveFromApi.effect_chance !== null) {
            description = description.replace(
              '$effect_chance%',
              moveFromApi.effect_chance.toString() + '%'
            );
          }
        }
        return new MoveDetail(
          name,
          moveFromApi.damage_class.name,
          moveFromApi.accuracy,
          new PokemonType(moveFromApi.type.name),
          description,
          moveFromApi.power
        );
      })
    );
  }
}
