import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonCacheService {
  private cache = new Map<string, Pokemon>();
  public cache$ = new BehaviorSubject<Pokemon>(null);

  constructor() {}

  //storing data in cache
  set(key: string, data: Pokemon): void {
    if (this.cache.has(key)) {
      return;
    }
    this.cache.set(key, data);
    this.cache$.next(this.cache.get(key));
  }

  // getting data from cache
  get(key: string): Pokemon {
    const data = this.cache.get(key);
    this.cache$.next(data);
    return data;
  }

  //clear cache
  clear(key: string): void {
    this.cache.delete(key);
    this.cache$.next(null);
  }
}
