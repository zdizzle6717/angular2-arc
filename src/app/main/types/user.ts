'use strict';

export class User {
	constructor(
		public id?: string,
		public email?: string,
		public username?: string,
		public password?: string,
		public roleFlags?: string,
		public role?: any,
		public id_token?: string,
		public isAuthenticated = false
	) { }
}
