// Angular Dependencies
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { RouterModule, PreloadAllModules } from '@angular/router';

// Platform and Environment providers/directives/pipes
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';

// Global Configs
import API_BASE_ROUTE from './configs/apiBaseRoute';
import AUTHORIZED_ROUTES from './configs/authorizedRoutes';
import ROLE_CONFIG from './configs/roleConfig';

// Modules
import { AlertsModule } from './library/modules/alerts/alerts.module';
import { AuthModule } from './library/modules/auth/auth.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { DemosModule } from './modules/demos/demos.module';
import { ProvidersModule } from './modules/providers/providers.module';
import { LoaderModule } from './library/modules/loader/loader.module';
import { ModalModule } from './library/modules/modal/modal.module';
import { PaginationModule } from './library/modules/pagination/pagination.module';

// Routing
import { RoutingModule } from './routing.module';

// Resolves
import { APP_RESOLVER_PROVIDERS } from './app.resolver';

// Component Views
import { HomeComponent } from './modules/main/components/views/home.component';
import { LoginComponent } from './modules/main/components/views/login.component';
import { PageNotFoundComponent } from './modules/main/components/views/pageNotFound.component';
import { RegisterComponent } from './modules/main/components/views/register.component';

// Components
import { AppComponent } from './app.component'; // Top level component
import { HeaderComponent } from './modules/main/components/header.component';
import { FooterComponent } from './modules/main/components/footer.component';

// Directives

// Services/Providers/Factories
import { AppState, InternalStateType } from './app.service';
import { CustomHttpProvider } from './modules/main/providers/customHttp.provider';

// Library Imports for Dependency Injection
import { AlertService } from './library/modules/alerts';
import { LoaderService } from './library/modules/loader';
import { ModalService } from './library/modules/modal';
import { UserService } from './library/modules/auth';

// Add root style sheet for compilation
import '../styles/app.scss';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

// `AppModule` is the main entry point into Angular2's bootstraping process
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
		HeaderComponent,
		FooterComponent,
    HomeComponent,
		LoginComponent,
		PageNotFoundComponent,
		RegisterComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
		ContactsModule,
		DemosModule,
		ProvidersModule,
		AlertsModule,
		LoaderModule,
		RoutingModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
		CustomHttpProvider,
    { provide: 'EGOV_API_BASE_ROUTE', useValue: API_BASE_ROUTE },
    { provide: 'EGOV_USER_ROLES', useValue: ROLE_CONFIG },
    { provide: 'EGOV_AUTHORIZED_ROUTES', useValue: AUTHORIZED_ROUTES },
    AlertService,
    LoaderService,
    ModalService,
    UserService
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) { }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
