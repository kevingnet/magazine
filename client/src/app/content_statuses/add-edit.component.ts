import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ContentStatusService, AlertService } from '@app/_services';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id!: string;
    isAddMode!: boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private contentStatusService: ContentStatusService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        const formOptions: AbstractControlOptions = { };
        this.form = this.formBuilder.group({
            contentStatus: ['', Validators.required],
        }, formOptions);

        if (!this.isAddMode) {
            this.contentStatusService.getById(this.id)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            // return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createContentStatus();
        } else {
            this.updateContentStatus();
        }
    }

    private createContentStatus() {
        this.contentStatusService.create(this.form.value)
            .pipe(first())
            .subscribe(() => {
                this.alertService.success('ContentStatus added', { keepAfterRouteChange: true });
                this.router.navigate(['../'], { relativeTo: this.route });
            })
            .add(() => this.loading = false);
    }

    private updateContentStatus() {
        this.contentStatusService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe(() => {
                this.alertService.success('ContentStatus updated', { keepAfterRouteChange: true });
                this.router.navigate(['../../'], { relativeTo: this.route });
            })
            .add(() => this.loading = false);
    }
}
