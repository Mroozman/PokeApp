import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { MenuModule } from 'primeng/menu';

@NgModule({
  declarations: [AppComponent, SearchComponent, HeaderComponent, ListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MenuModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
