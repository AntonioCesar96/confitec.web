import { Schooling } from './../models/schooling.model';
import { UrlService } from '../../../common/services/url.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpBaseService } from 'src/app/common/services/base.service';

@Injectable()
export class SchoolingService extends HttpBaseService {
  API = 'schooling';
  URL_BASE = '';

  constructor(
    private http: HttpClient,
    urlService: UrlService
  ) {
      super();
      this.URL_BASE = urlService.URL_BASE;
  }

  getAll(): Observable<Schooling[]> {
    return this.http.get<any>(`${this.URL_BASE}/${this.API}`);
  }
}
