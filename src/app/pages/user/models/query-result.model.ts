import { User } from './user.model';

export class QueryResult {
  numberOfRecords: number;
  page: number;
  quantityPerPage: number;
  list: User[];
}
