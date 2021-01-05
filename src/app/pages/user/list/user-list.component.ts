import { Schooling } from './../models/schooling.model';
import { SchoolingService } from './../services/schooling.service';
import { FilterService } from './../services/filter.service';
import { User } from './../models/user.model';
import { QueryResult } from './../models/query-result.model';
import { UserFilter } from './../models/user-filter.model';
import { UserService } from './../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild('modalDelete') modalDelete: any; 
  @ViewChild('modalSuccess') modalSuccess: any; 
  @ViewChild('modalFilter') modalFilter: any; 
  modalRefFilter: BsModalRef;
  modalRefSuccess: BsModalRef;
  modalRefDelete: BsModalRef;
  
  schooling: Schooling[] = [];
  queryResult = new QueryResult();
  user: User;

  get userFilter(): UserFilter {
    return this.filterService.userFilter;
  }

  constructor(
    private userService: UserService,
    private modalService: BsModalService,
    private filterService: FilterService,
    private schoolingService: SchoolingService,
    private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
    this.getSchooling();
  }

  getUsers(): void {
    this.userService.getUsers(this.userFilter)
      .subscribe(res => {
        this.queryResult = res;
      });
  }

  getSchooling(): void {
    this.schoolingService.getAll()
      .subscribe(res => {
        this.schooling = res;
      });
  }

  pageChanged($event) {
    this.userFilter.page = $event.page;
    this.getUsers();
  }

  openNew() {
    this.router.navigate(['user/new']);
  }

  edit(item) {
    this.router.navigate([`user/edit/${item.id}`]);
  }

  detail(item) {
    this.router.navigate([`user/detail/${item.id}`]);
  }

  openModalDelete(user: User) {
    this.user = user;
    this.modalRefDelete = this.modalService.show(this.modalDelete);
  }

  closeModalDelete() {
    this.modalRefDelete.hide();
  }

  delete() {
    this.userService.delete(this.user.id)
      .subscribe(res => {
        this.closeModalDelete();
        this.openModalSuccess();
      });
  }

  openModalSuccess() {
    this.modalRefSuccess = this.modalService.show(this.modalSuccess);
  }

  closeModalSuccess() {
    this.modalRefSuccess.hide();
    this.getUsers();
  }

  openModalFilter() {
    this.modalRefFilter = this.modalService.show(this.modalFilter);
  }

  closeModalFilter() {
    this.modalRefFilter.hide();    
  }

  filter() {
    this.userFilter.page = 1;
    this.getUsers();
    this.closeModalFilter();
  }

  getMessageResult(): string {
    if(this.queryResult.numberOfRecords === 0) {
      return 'Nenhum usuário encontrado!'
    }
    if(this.queryResult.numberOfRecords > 1) {
      return `${this.queryResult.numberOfRecords} Usuários encontrados`;
    }
    return `${this.queryResult.numberOfRecords} Usuário encontrado`;
  }
}
