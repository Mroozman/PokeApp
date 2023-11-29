import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { resolvePokemonData } from './services/pokemon.service';
import { ErrorPageComponent } from './error-page/error-page.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full',
  },
  { path: 'search', component: SearchComponent, data: { animation: 'isLeft' } },
  {
    path: 'details/:pokemon',
    component: DetailsComponent,
    resolve: { pokemon: resolvePokemonData },
    data: { animation: 'toDetails' },
  },
  { path: 'list', component: ListComponent, data: { animation: 'isRight' } },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: { message: 'Page not found!' },
  },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
