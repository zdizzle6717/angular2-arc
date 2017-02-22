import { XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { CustomHttpService } from '../services/customHttp.service';
import { LoaderService } from '../../../library/modules/loader';
import { UserService } from '../../../library/modules/auth';

export function CustomHttpFactory(backend: XHRBackend, options: RequestOptions, router: Router, loaderService: LoaderService, userService: UserService) {
	return new CustomHttpService(backend, options, router, loaderService, userService);
}
