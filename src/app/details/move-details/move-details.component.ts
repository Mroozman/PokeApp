import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Move } from 'src/app/models/move.model';
import { MoveDetail } from 'src/app/models/moveDetail';

@Component({
  selector: 'app-move-details',
  templateUrl: './move-details.component.html',
  styleUrls: ['./move-details.component.scss'],
})
export class MoveDetailsComponent implements OnInit {
  @Input() pokemonMove: Move;
  public pokemonMoveDetail: MoveDetail;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log(this.pokemonMove);
    // this.http.get(this.pokemonMove.details).pipe(map(
    // )).subscribe()
  }
}
