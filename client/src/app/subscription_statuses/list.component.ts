import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { SubscriptionStatusService } from '@app/_services';
import { SubscriptionStatus } from '@app/_models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    subscriptionStatuses!: SubscriptionStatus[];

    constructor(private subscriptionStatusService: SubscriptionStatusService) {}

    ngOnInit() {
        this.subscriptionStatusService.getAll()
            .pipe(first())
            .subscribe(subscriptionStatuses => this.subscriptionStatuses = subscriptionStatuses);
    }

    deleteSubscriptionStatus(id: string) {
        const subscriptionStatus = this.subscriptionStatuses.find(x => x.id === id);
        if (!subscriptionStatus) return;
        subscriptionStatus.isDeleting = true;
        this.subscriptionStatusService.delete(id)
            .pipe(first())
            .subscribe(() => this.subscriptionStatuses = this.subscriptionStatuses.filter(x => x.id !== id));
    }
}
