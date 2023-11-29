import { Component, OnInit } from '@angular/core';
import { TypeService } from './services/type.service';
import { fader } from './route-animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fader],
})
export class AppComponent implements OnInit {
  constructor(private typeService: TypeService) {}

  ngOnInit(): void {
    this.typeService.getTypesFormApi();
  }

  public prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
