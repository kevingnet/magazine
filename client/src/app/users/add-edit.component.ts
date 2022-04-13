import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

// @ts-ignore
import {RoleService, AccountService, AlertService, CommonService} from '@app/_services';
import {Role} from '@app/_models';

@Component({templateUrl: 'add-edit.component.html'})
export class AddEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  idRole: number = 0;
  rolesLoaded = false;
  roleList: Role[] = [];

   constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private roleService: RoleService,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
   }

  public onSelectRole({value}: { value: any }): void {
    let index = value.target.value.toString();
    index = index.replace(/\D/g,'');
    this.idRole = Number(index);
  }

  compareFn(a,b) {
    return b.id === a.idRole;
  }
  ngOnInit() {

    this.roleService.getAll().subscribe(data => {
      if (data) {
        for (const d of data) {
          this.roleList.push(d);
        }
        this.rolesLoaded = true;
      }
    });
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.idRole = Number(this.idRole);

    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      idRole: [0, Validators.required],
      username: ['', Validators.required],
      password: ['', passwordValidators]
    });

    if (!this.isAddMode) {
      this.accountService.getById(this.id)
        .pipe(first())
        .subscribe(x => this.form.patchValue(x));
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      //return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  private createUser() {
    this.accountService.register(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('User added successfully', {keepAfterRouteChange: true});
          this.router.navigate(['../'], {relativeTo: this.route});
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  private updateUser() {
    this.form.value.idRole = this.idRole;
    this.accountService.update(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Update successful', {keepAfterRouteChange: true});
          this.router.navigate(['../../'], {relativeTo: this.route});
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
}
