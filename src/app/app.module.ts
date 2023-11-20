import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, SearchComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
