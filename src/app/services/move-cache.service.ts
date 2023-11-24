import { Injectable } from '@angular/core';
import { Move } from '../models/move.model';
import { BehaviorSubject } from 'rxjs';
import { MoveDetail } from '../models/moveDetail';

@Injectable({
  providedIn: 'root',
})
export class MoveCacheService {
  private cache = new Map<string, MoveDetail>();
  public cache$ = new BehaviorSubject<MoveDetail>(null);

  constructor() {}

  //storing data in cache
  set(key: string, data: MoveDetail): void {
    if (this.cache.has(key)) {
      return;
    }
    this.cache.set(key, data);
    this.cache$.next(this.cache.get(key));
  }

  // getting data from cache
  get(key: string): MoveDetail {
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
