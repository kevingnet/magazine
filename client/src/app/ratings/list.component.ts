import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { RatingService } from '@app/_services';
import { Rating } from '@app/_models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    ratings!: Rating[];

    constructor(private ratingService: RatingService) {}

    ngOnInit() {
        this.ratingService.getAll()
            .pipe(first())
            .subscribe(ratings => this.ratings = ratings);
    }

    deleteRating(id: string) {
        const rating = this.ratings.find(x => x.id === id);
        if (!rating) return;
        rating.isDeleting = true;
        this.ratingService.delete(id)
            .pipe(first())
            .subscribe(() => this.ratings = this.ratings.filter(x => x.id !== id));
    }
}