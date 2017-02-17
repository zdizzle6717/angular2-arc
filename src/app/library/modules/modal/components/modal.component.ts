import { Component, Input, Output, OnInit, Inject, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ModalService } from '../services/modal.service';

@Component({
    'selector': 'modal',
    'providers': [],
    templateUrl: '../templates/modal.html',
})
export class ModalComponent implements OnInit {
    @Output() public onConfirm = new EventEmitter<any>();

    // Default Modal Configuration
    public modalConfig: any = {
        'content': undefined,
        'actionButtonText': 'Ok',
        'closeButtonText': 'Close'
    };
    public modalId: (string | number);
    public modalTitle: string = '';
    public isActive: boolean = false;
    public subscription: Subscription;
    public model: any;

    constructor(private service: ModalService) { }

    public ngOnInit() {
        this.subscription = this.service.activeModals$.subscribe((activeModals: any) => {
            if (activeModals[this.modalId]) {
                this.isActive = activeModals[this.modalId].active;
            }
        });
        this.subscription = this.service.config$.subscribe((config: any) => {
            this.modalConfig = Object.assign(this.modalConfig, config);
        });
    }

    public confirm(data: any) {
        this.onConfirm.emit(data);
        this.hideModal(this.modalId);
    }

    public hideModal(id: (string | number)) {
        this.service.hideModal(this.modalId);
    }

    @Input() set name(modalId: string) {
        this.modalId = modalId;
    }

    @Input() set title(modalTitle: string) {
        this.modalTitle = modalTitle;
    }

}
