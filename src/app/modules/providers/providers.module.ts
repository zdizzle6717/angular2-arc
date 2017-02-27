import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Modules
import { AuthModule } from '../../library/modules/auth/auth.module';
import { ModalModule } from '../../library/modules/modal/modal.module';
import { ValidationModule } from '../../library/modules/validation';

// Routing
import { RoutingModule } from './routing.module';

// Component Views
import { ProviderSearchComponent } from './components/views/providerSearch.component';
import { ProviderViewComponent } from './components/views/providerView.component';
import { ProviderEditComponent } from './components/views/providerEdit.component';

// Components
import { ProviderFormComponent } from './components/providerForm.component';
import { ProviderListComponent } from './components/providerList.component';
import { ProviderTableComponent } from './components/providerTable.component';

// Services
import { AuthGuard } from '../../library/modules/auth/services/authGuard.service';
import { ProviderService } from './services/provider.service';

@NgModule({
  'imports': [ CommonModule, ReactiveFormsModule, RoutingModule, AuthModule, ModalModule, ValidationModule ],
  'declarations': [ ProviderSearchComponent, ProviderViewComponent, ProviderEditComponent, ProviderFormComponent, ProviderListComponent, ProviderTableComponent ],
	'providers': [ AuthGuard, ProviderService ],
  'exports': [ ProviderTableComponent ]
})
export class ProvidersModule { }
