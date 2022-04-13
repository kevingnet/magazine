import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { ContentService } from '@app/_services';
import { Content } from '@app/_models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    contents!: Content[];

    constructor(private contentService: ContentService) {}

    ngOnInit() {
        this.contentService.getAll()
            .pipe(first())
            .subscribe(contents => this.contents = contents);
    }

    deleteContent(id: string) {
        const content = this.contents.find(x => x.id === id);
        if (!content) return;
        content.isDeleting = true;
        this.contentService.delete(id)
            .pipe(first())
            .subscribe(() => this.contents = this.contents.filter(x => x.id !== id));
    }
}
