import { AuthGuard } from './services/authGuard.service';
import { UserService } from './services/user.service';

// Requires a string token of 'EGOV_USER_ROLES' to be set in main app.module

export {
		AuthGuard,
    UserService
}
