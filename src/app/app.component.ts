import { Component } from '@angular/core';
import { fadeAnimation } from './animation.component';

@Component({
  selector: 'app-root',
  animations: [fadeAnimation], // register the animation
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

}
