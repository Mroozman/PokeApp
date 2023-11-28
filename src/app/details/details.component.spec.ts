import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComponent } from './details.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Ability } from '../models/ability.model';
import { Move } from '../models/move.model';
import { Pokemon } from '../models/pokemon.model';
import { Stats } from '../models/stats.model';
import { TypeService } from '../services/type.service';
import { Type, inject } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let typeService: TypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ get: (key) => 'value' }),
          },
        },
        TypeService,
      ],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(DetailsComponent);
    typeService = TestBed.inject(TypeService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate sum of stats correctly', () => {
    component.pokemonData = new Pokemon(
      1,
      'testasaur',
      10,
      10,
      [new Ability('testability', 'some url', false, 'no effect')],
      [
        new Move('testatack', 'url to details'),
        new Move('testbeam', 'url to details'),
      ],
      'url to sprite',
      new Stats(10, 10, 10, 10, 10, 10),
      [typeService.get('normal')]
    );
    const statsSum = component.calculateStatsSum();
    expect(statsSum).toBe(60);
  });
});
