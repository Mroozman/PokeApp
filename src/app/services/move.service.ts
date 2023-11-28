import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MoveDetail } from '../models/moveDetail';
import { PokemonType } from '../models/pokemonType.model';

class MoveFromApi {
  constructor(
    public name: string,
    public effect_entries: { short_effect: string }[],
    public effect_chance: number,
    public damage_class: { name: string },
    public accuracy: number,
    public type: { name: string },
    public power: number
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class MoveService {
  constructor(private http: HttpClient) {}

  public getMoveByNameOrId(url: string): Observable<MoveDetail> {
    return this.http.get<MoveFromApi>(url).pipe(
      map((moveFromApi) => {
        const name = moveFromApi.name.replace('-', ' ');
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
        const moveDetail = new MoveDetail(
          name,
          moveFromApi.damage_class.name,
          moveFromApi.accuracy,
          new PokemonType(moveFromApi.type.name),
          description,
          moveFromApi.power
        );
        return moveDetail;
      })
    );
  }
}
