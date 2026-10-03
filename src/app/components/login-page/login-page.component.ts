import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})

export class LoginPageComponent {
  warning: string = ''
  userName: string = ''
  userPass: string = ''

  constructor(private UserServise: UserService, private router: Router) { }

  login(){
    if (this.UserServise.chandgeActiveUser(this.userName, this.userPass)) {
      this.router.navigate(["/general"])
    } else {
      this.warning = "повторите попытку"
    }
  }

  register() {
    if (this.userName && this.userPass) {
      this.UserServise.newUsers(this.userName, this.userPass)
      this.router.navigate(["/general"])
    } else {
      this.warning = "повторите попытку"
    }
  }

}