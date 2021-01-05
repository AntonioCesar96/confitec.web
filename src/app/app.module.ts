import { FilterService } from './pages/user/services/filter.service';
import { SchoolingService } from './pages/user/services/schooling.service';
import { UserService } from './pages/user/services/user.service';
import { ConfitecCommonModule } from './common/common.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { UserListComponent } from './pages/user/list/user-list.component';
import { UserCreateComponent } from './pages/user/create/user-create.component';
import { UserDetailComponent } from './pages/user/detail/user-detail.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserListComponent,
    UserCreateComponent,
    UserDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ConfitecCommonModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
  providers: [
    UserService,
    SchoolingService,
    FilterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
