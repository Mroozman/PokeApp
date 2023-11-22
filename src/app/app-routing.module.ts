import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { resolvePokemonData } from './services/pokemon.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full',
  },
  { path: 'search', component: SearchComponent },
  {
    path: 'details/:pokemon',
    component: DetailsComponent,
    resolve: { pokemon: resolvePokemonData },
  },
  { path: 'list', component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
