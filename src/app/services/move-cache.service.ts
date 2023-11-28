import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MoveDetail } from '../models/moveDetail';

@Injectable({
  providedIn: 'root',
})
export class MoveCacheService {
  private cache = new Map<string, MoveDetail>();
  public cache$ = new BehaviorSubject<MoveDetail>(null);

  constructor() {}

  set(key: string, data: MoveDetail): void {
    const storedMove = this.get(key);
    if (storedMove) {
      return;
    }
    localStorage.setItem(key, JSON.stringify(data));
  }

  get(key: string): MoveDetail {
    return JSON.parse(localStorage.getItem(key));
  }
}
