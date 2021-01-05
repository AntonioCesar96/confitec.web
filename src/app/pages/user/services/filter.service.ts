import { UserFilter } from './../models/user-filter.model';
import { Injectable } from '@angular/core';

@Injectable()
export class FilterService {
  userFilter = new UserFilter();
}
