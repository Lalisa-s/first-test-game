import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { World } from '../../data/interface';
import { GeneralButtonPageComponent } from '../general-button-page/general-button-page.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-worlds-page',
  imports: [GeneralButtonPageComponent, CommonModule, FormsModule, ],
  templateUrl: './worlds-page.component.html',
  styleUrl: './worlds-page.component.css'
})

export class WorldsPageComponent {
  worlds: World[] = []

  constructor(private UserService: UserService, private router : Router) {
    this.worlds = this.UserService.getActiveUser().worlds
  }

  vew: boolean = false

  changeVew() {
    this.vew = !this.vew
  }

  game(name: string) {
    this.UserService.changeActiveWorld(name)
    this.router.navigate(["/game"])
  }

  deleteWorld(name: string) {
    this.UserService.deleteWorld(name)
  }

  worldName: string = ''

  createNewGame() {
    this.UserService.newWorld(this.worldName)
    this.changeVew()
  }

}