'use strict';

export class User {
    constructor(
        public id?: string,
        public email?: string,
        public username?: string,
        public password?: string,
        public roleFlags?: string,
        public id_token?: string,
        public roleConfig?: any,
        public redirect?: any,
        public isAuthenticated = false
    ) { }
}
