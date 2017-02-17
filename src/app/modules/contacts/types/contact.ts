'use strict';

export class Contact {
	constructor(
		public id?: string,
		public firstName?: string,
		public lastName?: string,
		public email?: string,
		public middleName?: string,
		public gender?: string,
		public mobilePhone?: string,
		public fax?: string,
		public type?: string,
		public status?: string,
		public maritalStatus?: string
	) { }
}
