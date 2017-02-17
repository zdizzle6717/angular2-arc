import { XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { CustomHttpService } from '../services/customHttp.service';
import { CustomHttpFactory } from '../factories/customHttp.factory';
import { LoaderService } from '../../library/modules/loader';
import { UserService } from '../../library/modules/auth';

export const CustomHttpProvider = {
	provide: CustomHttpService,
	useFactory: CustomHttpFactory,
	deps: [XHRBackend, RequestOptions, Router, LoaderService, UserService]
};
