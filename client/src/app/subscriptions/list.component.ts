import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { SubscriptionService } from '@app/_services';
import { Subscription } from '@app/_models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    subscriptions!: Subscription[];

    constructor(private subscriptionService: SubscriptionService) {}

    ngOnInit() {
        this.subscriptionService.getAll()
            .pipe(first())
            .subscribe(subscriptions => this.subscriptions = subscriptions);
    }

    deleteSubscription(id: string) {
        const subscription = this.subscriptions.find(x => x.id === id);
        if (!subscription) return;
        subscription.isDeleting = true;
        this.subscriptionService.delete(id)
            .pipe(first())
            .subscribe(() => this.subscriptions = this.subscriptions.filter(x => x.id !== id));
    }
}
