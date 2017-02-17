import { Component } from '@angular/core';

@Component({
    'selector': 'contact-search',
    'template': `
		<div class="row">
			<h1 class="push-bottom-2x">Search Contacts</h1>
			<div class="row">
					<div class="small-12 medium-4 large-4 columns">
						<a [routerLink]="['/contacts', 'create']" routerLinkActive="active" class="button small-12 large-6">
							<i class="fa fa-plus"></i> Add New Contact
						</a>
					</div>
					<div class="small-12 medium-4 large-4 columns medium-offset-4 large-offset-4">
							<div class="search-input">
									<input type="search" placeholder="Enter search terms..."/>
									<span class="fa fa-search search-icon"></span>
							</div>
					</div>
			</div>
			<contact-list></contact-list>
			<div class="row">
					<div class="small-12 medium-6 large-3 medium-offset-6 large-offset-9 columns text-right">
							<label>Sort by:
									<select id="orderParams" defaultValue="createdAt">
											<option value="name">Name (ascending)</option>
											<option value="email">Email (ascending)</option>
											<option value="phone">Phone (ascending)</option>
											<option value="createdAt">Date Created (ascending)</option>
											<option value="updatedAt">Last Updated (ascending)</option>
									</select>
							</label>
					</div>
			</div>
		</div>
	`,
})
export class ContactSearchComponent {
}
