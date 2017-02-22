/*
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
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
    <site-footer></site-footer>
  `
})
export class AppComponent implements OnInit {
    constructor(public appState: AppState, private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) { }

    public ngOnInit() {
        console.log('Initial App State', this.appState.state);

        this.router.events.filter((event) => {
            return event instanceof NavigationEnd;
        })
        .map(() => this.activatedRoute)
        .map((route) => {
            while (route.firstChild) {
                route = route.firstChild;
            }
            return route;
        })
        .filter((route) => route.outlet === 'primary')
        .mergeMap((route) => route.data)
				.subscribe((event) => this.titleService.setTitle(event['title']));
    }
}
