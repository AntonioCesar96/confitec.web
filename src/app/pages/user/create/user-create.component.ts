import { User } from './../models/user.model';
import { UserService } from './../services/user.service';
import { CustomValidators } from './../../../common/forms/custom-validadors';
import { Schooling } from './../models/schooling.model';
import { SchoolingService } from './../services/schooling.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  @ViewChild('modalSuccess') modalSuccess: any; 
  @ViewChild('modalError') modalError: any; 
  modalRefSuccess: BsModalRef;
  modalRefError: BsModalRef;
  
  configModal: ModalOptions = {
    animated: true,
    keyboard: false,
    backdrop: 'static',
    ignoreBackdropClick: false
  };
  
  form: FormGroup;
  user: User;
  schooling: Schooling[] = [];
  errors: string[] = [];

  constructor(
    private modalService: BsModalService,
    private schoolingService: SchoolingService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {    
    this.createForm();
    this.getIdParam();
    this.getSchooling();
  }

  getIdParam() {
    const id = this.activatedRoute.snapshot.params['id'];
    if(!id) {
      return;
    } 

    this.userService.getById(id)
      .subscribe(res => {
        if(res.id) {
          this.user = res;
          this.fillForm();
        }
      });
  }
  
  private createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, CustomValidators.noWhiteSpaceValidator]],
      lastName: [''],
      email: ['', [Validators.required, CustomValidators.emailValidator]],
      birthDate: ['', [Validators.required, CustomValidators.invalidDateValidator]],
      schoolingId: ['', [Validators.required]],
    });
  }

  private fillForm(): void {
    this.form.get('name').setValue(this.user.name);
    this.form.get('lastName').setValue(this.user.lastName || '');
    this.form.get('email').setValue(this.user.email);
    this.form.get('birthDate').setValue(this.user.birthDateFormat);
    this.form.get('schoolingId').setValue(this.user.schoolingId);
  }

  getSchooling(): void {
    this.schoolingService.getAll()
      .subscribe(res => {
        this.schooling = res;
      });
  }

  save() {
    if (!this.form.valid) {
      CustomValidators.validateFields(this.form);
      return false;
    }

    const model = this.createModel();
    if(this.user) {
      this.update(model);
      return;
    }

    this.create(model);
  }

  update(model) {
    this.userService.update(model)
    .subscribe(res => {
      if(res.success) {
        this.openModalSuccess();
        return;
      }

      this.errors = res.data;
      this.openModalError();
    });
  }

  create(model) {
    this.userService.create(model)
    .subscribe(res => {
      if(res.success) {
        this.openModalSuccess();
        return;
      }

      this.errors = res.data;
      this.openModalError();
    });
  }

  createModel(): User {
    const user = new User();
    user.id = this.user ? this.user.id : 0;
    user.name = this.form.value.name;
    user.lastName = this.form.value.lastName;
    user.email = this.form.value.email;
    user.birthDate = this.form.value.birthDate.split('/').reverse().join('-');
    user.schoolingId = this.form.value.schoolingId;

    return user;
  }

  openModalSuccess() {
    this.modalRefSuccess = this.modalService.show(this.modalSuccess, this.configModal);
  }

  closeModalSuccess() {
    this.modalRefSuccess.hide();
    this.router.navigate(['user']);
  }

  openModalError() {
    this.modalRefError = this.modalService.show(this.modalError, this.configModal);
  }

  closeModalError() {
    this.modalRefError.hide();
  }

  back() {
    this.router.navigate(['user']);
  }
}
