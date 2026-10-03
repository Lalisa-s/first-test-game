import { Component } from '@angular/core';
import { GeneralButtonPageComponent } from '../general-button-page/general-button-page.component';
import { UserService } from '../../service/user.service';
import { Weapon } from '../../data/interface';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-weapons-page',
  imports: [GeneralButtonPageComponent, CommonModule, NgClass],
  templateUrl: './weapons-page.component.html',
  styleUrl: './weapons-page.component.css'
})
export class WeaponsPageComponent {
  allWeapons : Weapon[] = []

  constructor(private UserServise: UserService) {
    this.allWeapons = this.UserServise.getActiveUser().weapons
  }

  visibility : boolean = true
  
  switching(){
    this.visibility = !this.visibility
  }
}
