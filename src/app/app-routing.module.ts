import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full',
  },
  { path: 'search', component: SearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
