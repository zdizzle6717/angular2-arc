import { Component, OnInit } from '@angular/core';
import { Contact } from '../types/contact';
import { ContactService } from '../services/contact.service';

@Component({
    'selector': 'contact-list',
    templateUrl: '../templates/contactList.html'
})
export class ContactListComponent implements OnInit {
    public pagination: any = {
        'pageNumber': 1,
        'pageSize': 3,
        'totalPages': 1,
        'totalResults': 3
    };
    public contacts: Contact[];
    private errorMessage: string;
    private searchCriteria: any = {
        'pageNumber': 1,
        'pageSize': 3
    };

    constructor(private contactService: ContactService) { }

    public ngOnInit() { this.searchContactsPaginate(1); }

    public getContacts() {
        this.contactService.getContacts().subscribe(
            (contacts: Contact[]) => {
                return this.contacts = contacts;
            },
            (error: any) => this.errorMessage = error
        );
    }

    public searchContactsPaginate(pageNumber: number) {
        this.contactService.paginatedSearch(Object.assign(this.searchCriteria, { 'pageNumber': pageNumber })).subscribe((response) => {
            this.contacts = response.results;
            this.pagination = response.pagination;
        });
    }
}
