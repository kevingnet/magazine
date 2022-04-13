import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { ContentStatusService } from '@app/_services';
import { ContentStatus } from '@app/_models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    contentStatuses!: ContentStatus[];

    constructor(private contentStatusService: ContentStatusService) {}

    ngOnInit() {
        this.contentStatusService.getAll()
            .pipe(first())
            .subscribe(contentStatuses => this.contentStatuses = contentStatuses);
    }

    deleteContentStatus(id: string) {
        const contentStatus = this.contentStatuses.find(x => x.id === id);
        if (!contentStatus) return;
        contentStatus.isDeleting = true;
        this.contentStatusService.delete(id)
            .pipe(first())
            .subscribe(() => this.contentStatuses = this.contentStatuses.filter(x => x.id !== id));
    }
}
