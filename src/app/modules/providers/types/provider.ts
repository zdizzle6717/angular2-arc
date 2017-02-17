'use strict';

export class Provider {
	constructor(
		public id?: string,
		public name?: string,
		public dba?: string,
		public email?: string,
		public identifier?: string,
		public identifierType?: string,
		public legalName?: string,
		public phone?: string,
		public providerNumber?: string,
		public state?: string
	) { }
}
