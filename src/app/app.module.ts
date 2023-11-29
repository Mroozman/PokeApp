import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { MenuModule } from 'primeng/menu';
import { SearchBarComponent } from './search/search-bar/search-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { ListOfSearchedComponent } from './search/list-of-searched/list-of-searched.component';
import { DetailsComponent } from './details/details.component';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { MoveDetailsComponent } from './details/move-details/move-details.component';
import { AbilityDetailsComponent } from './details/ability-details/ability-details.component';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HeaderComponent,
    ListComponent,
    SearchBarComponent,
    ListOfSearchedComponent,
    DetailsComponent,
    MoveDetailsComponent,
    AbilityDetailsComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MenuModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TooltipModule,
    TableModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
