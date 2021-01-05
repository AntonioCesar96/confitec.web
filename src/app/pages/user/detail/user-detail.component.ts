import { UserService } from './../services/user.service';
import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.getIdParam();
  }

  getIdParam() {
    const id = this.activatedRoute.snapshot.params['id'];
    if(!id) {
      this.back();
      return;
    } 

    this.userService.getById(id)
      .subscribe(res => {
        if(res.id) {
          this.user = res;
        }
      });
  }

  back() {
    this.router.navigate(['user']);
  }
}
