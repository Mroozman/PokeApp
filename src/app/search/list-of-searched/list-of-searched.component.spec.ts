import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfSearchedComponent } from './list-of-searched.component';
import { PokemonService } from 'src/app/services/pokemon.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListOfSearchedComponent', () => {
  let component: ListOfSearchedComponent;
  let fixture: ComponentFixture<ListOfSearchedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfSearchedComponent],
      providers: [PokemonService],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ListOfSearchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have proper error message', () => {
    expect(component.noPokemonsMessage).toBe('No pokemons found!');
  });
});
