import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
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
    const cachedMoveDetail = this.moveCacheService.get(this.pokemonMove.name);
    if (cachedMoveDetail !== undefined) {
      this.pokemonMoveDetail = cachedMoveDetail;
    } else {
      this.subscriptionStore.add(
        this.moveService
          .getMoveByNameOrId(this.pokemonMove.details)
          .subscribe((move: MoveDetail) => {
            this.pokemonMoveDetail = move;
          })
      );
    }

    this.pokemonMove.name = this.pokemonMove.name.replace('-', ' ');
  }

  ngOnDestroy(): void {
    this.subscriptionStore.unsubscribe();
  }
}
