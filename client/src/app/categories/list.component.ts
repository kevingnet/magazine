import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { CategoryService } from '@app/_services';
import { Category } from '@app/_models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    categories!: Category[];

    constructor(private categoryService: CategoryService) {}

    ngOnInit() {
        this.categoryService.getAll()
            .pipe(first())
            .subscribe(categories => this.categories = categories);
    }

    deleteCategory(id: string) {
        const category = this.categories.find(x => x.id === id);
        if (!category) return;
        category.isDeleting = true;
        this.categoryService.delete(id)
            .pipe(first())
            .subscribe(() => this.categories = this.categories.filter(x => x.id !== id));
    }
}
