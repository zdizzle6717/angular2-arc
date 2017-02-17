import { Component, Input, OnInit, Inject, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { LoaderService } from '../services/loader.service';

@Component({
    'selector': 'loader',
    'providers': [],
    templateUrl: '../templates/loader.html',
})
export class LoaderComponent implements OnInit {
    public subscription: Subscription;
    public loaderType: string = 'standard';
    public isActive = false;

    constructor(private service: LoaderService) { }

    public ngOnInit() {
        this.subscription = this.service.active$.subscribe((active: boolean) => {
            this.isActive = active;
        });
    }

    @Input() set type(loaderType: string) {
        this.loaderType = loaderType;
    }

}
