export class UserFilter {
  name: string;
  lastName: string;
  email: string;
  birthDate: string;
  birthDateFormat: string;
  schoolingId: number;
  page: number;
  quantityPerPage: number;

  constructor() {
    this.page = 1;
    this.quantityPerPage = 5;
  }
}
