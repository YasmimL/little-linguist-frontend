import { Component } from '@angular/core';
import { UserDataService } from 'src/app/services/user.data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  get avatar() {
    return this.userDataService.user?.avatar;
  }

  constructor(private userDataService: UserDataService) {}
}
