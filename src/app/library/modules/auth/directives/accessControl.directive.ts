import { Directive, OnInit, OnDestroy, Input, Inject } from '@angular/core';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { User } from '../types/user';
import { Subscription } from 'rxjs/Subscription';
import checkAuthorization from '../utilities/checkAuthorization';
import { UserService } from '../services/user.service';

@Directive({ selector: '[authAccessControl]' })
export class AccessControlDirective implements OnInit, OnDestroy {
	private subscription: Subscription;
	private accessLevel: string[] = ['public'];

  constructor(@Inject('EGOV_USER_ROLES') private userRoles: any, private userService: UserService, private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { }

	public ngOnInit() {
    this.subscription = this.userService.currentUser$.subscribe((user: User) => {
			if (checkAuthorization(this.accessLevel, user, this.userRoles)) {
				this.viewContainer.createEmbeddedView(this.templateRef);
			} else {
				this.viewContainer.clear();
			}
		});
  }

	@Input() set authAccessControl(accessLevel: string[]) {
    this.accessLevel = accessLevel;
  }

	public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
