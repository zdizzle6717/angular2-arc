/*
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { scrollTo } from '../library/utilities/index';
import checkAuthorization from '../library/modules/auth/utilities/checkAuthorization';
import { User } from './types/user';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <site-header></site-header>
		<div class="content-container">
			<!-- Routed views go here -->
	    <main>
	      <router-outlet></router-outlet>
	    </main>
		</div>
		<alerts></alerts>
		<loader type="bars"></loader>
    <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>
    <site-footer></site-footer>
  `
})
export class AppComponent implements OnInit {
  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Angular 2 Webpack Starter';
  public url = 'https://twitter.com/AngularClass';

  constructor(
    public appState: AppState
  ) {}

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }
}
