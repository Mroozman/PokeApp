import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Move } from 'src/app/models/move.model';
import { MoveDetail } from 'src/app/models/moveDetail';
import { MoveCacheService } from 'src/app/services/move-cache.service';
import { MoveService } from 'src/app/services/move.service';

@Component({
  selector: 'app-move-details',
  templateUrl: './move-details.component.html',
  styleUrls: ['./move-details.component.scss'],
})
export class MoveDetailsComponent implements OnInit, OnDestroy {
  @Input() pokemonMove: Move;
  private subscriptionStore = new Subscription();
  public pokemonMoveDetail: MoveDetail;

  constructor(
    private moveService: MoveService,
    private moveCacheService: MoveCacheService
  ) {}

  ngOnInit(): void {
    const moveStorageName = this.pokemonMove.name.replace('-', ' ');
    const cachedMoveDetail = this.moveCacheService.get(moveStorageName);
    if (cachedMoveDetail !== null) {
      this.pokemonMoveDetail = cachedMoveDetail;
    } else {
      this.subscriptionStore.add(
        this.moveService
          .getMoveByNameOrId(this.pokemonMove.details)
          .subscribe((move: MoveDetail) => {
            this.pokemonMoveDetail = move;
            this.moveCacheService.set(move.name, move);
          })
      );
    }

    this.pokemonMove.name = moveStorageName;
  }

  ngOnDestroy(): void {
    this.subscriptionStore.unsubscribe();
  }
}
