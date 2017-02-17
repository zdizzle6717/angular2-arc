import { NgModule, OpaqueToken } from '@angular/core';
import { CommonModule } from '@angular/common';

// Directives
import { AccessControlDirective } from './directives/accessControl.directive';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ AccessControlDirective ],
	providers: [ ],
  exports: [ AccessControlDirective ]
})
export class AuthModule { }
