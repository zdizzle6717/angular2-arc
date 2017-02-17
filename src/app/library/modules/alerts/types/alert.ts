'use strict';

export class Alert {
	constructor(
		public id?: number,
		public delay?: number,
		public message?: string,
		public show?: boolean,
		public title?: string,
		public type?: string
	) { }
}
