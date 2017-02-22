import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Modules
import { AuthModule } from '../../library/modules/auth/auth.module';
import { ModalModule } from '../../library/modules/modal/modal.module';
import { PaginationModule } from '../../library/modules/pagination/pagination.module';

// Routing
import { RoutingModule } from './routing.module';

// Component Views
import { ContactSearchComponent } from './components/views/contactSearch.component';
import { ContactViewComponent } from './components/views/contactView.component';
import { ContactEditComponent } from './components/views/contactEdit.component';

// Components
import { ContactFormComponent } from './components/contactForm.component';
import { ContactListComponent } from './components/contactList.component';
import { ContactTableComponent } from './components/contactTable.component';

// Services
import { ContactService } from './services/contact.service';

@NgModule({
    'imports': [CommonModule, ReactiveFormsModule, RoutingModule, AuthModule, ModalModule, PaginationModule],
    'declarations': [ContactSearchComponent, ContactViewComponent, ContactEditComponent, ContactFormComponent, ContactListComponent, ContactTableComponent],
    'providers': [ContactService],
    'exports': [ContactTableComponent]
})
export class ContactsModule { }
