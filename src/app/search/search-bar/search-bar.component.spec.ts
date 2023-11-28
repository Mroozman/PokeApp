import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { PokemonService } from 'src/app/services/pokemon.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      providers: [PokemonService],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have proper form', () => {
    expect(component.searchBarForm.controls.pokemonInput).toBeTruthy();
  });
});
