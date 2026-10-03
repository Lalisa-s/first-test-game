import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { StatUsers, User } from '../../data/interface';
import { GeneralButtonPageComponent } from '../general-button-page/general-button-page.component';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-statistics-page',
  imports: [GeneralButtonPageComponent, CommonModule, NgClass],
  templateUrl: './statistics-page.component.html',
  styleUrl: './statistics-page.component.css'
})
export class StatisticsPageComponent {
  allStat! : StatUsers[]
  myStat! : User
  constructor(private UserServise: UserService) {
    this.allStat = this.UserServise.getStatUsers()
    this.myStat = this.UserServise.getActiveUser()
  }

  visibility : boolean = true
  
  switching(){
    this.visibility = !this.visibility
  }
}
