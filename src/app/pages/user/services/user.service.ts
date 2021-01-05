import { QueryResult } from './../models/query-result.model';
import { UserFilter } from './../models/user-filter.model';
import { User } from './../models/user.model';
import { UrlService } from '../../../common/services/url.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpBaseService } from 'src/app/common/services/base.service';

@Injectable()
export class UserService extends HttpBaseService {
  API = 'user';
  URL_BASE = '';

  constructor(
    private http: HttpClient,
    urlService: UrlService
  ) {
      super();
      this.URL_BASE = urlService.URL_BASE;
  }

  create(user: User): Observable<any> {
    return this.http.post<any>(`${this.URL_BASE}/${this.API}`, user);
  }

  update(user: User): Observable<any> {
    return this.http.put<any>(`${this.URL_BASE}/${this.API}`, user);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.URL_BASE}/${this.API}/${id}`);
  }

  getById(id: number): Observable<User> {
    return this.http.get<any>(`${this.URL_BASE}/${this.API}/${id}`);
  }

  getUsers(userFilter: UserFilter): Observable<QueryResult> {
    var params = this.prepareParameters(userFilter);
    return this.http.get<any>(`${this.URL_BASE}/${this.API}/${params}`);
  }
}
