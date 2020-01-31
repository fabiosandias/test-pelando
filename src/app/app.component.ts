import { Component } from '@angular/core';
import { slideInAnimation } from './app.animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'tes-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ slideInAnimation ]
})
export class AppComponent {
  title = 'test-pelando';

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
