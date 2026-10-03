import { Injectable } from '@angular/core';
import { StatUsers, User, World } from '../data/interface';
import { weapons } from '../data/weapons';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor() { }

  // private users: User[] = []
  // private activeUser!: User;
  private users: User[] = [{
    name: "name",
    pasword: "123",
    weapons: weapons,
    worlds: [{
      name: "string",
      progress: {
        floor: 1,
        room: 2,
      },
      bool: true,
      inventory: ['start weapon', 'potion1'],
      money: 10,
      hp: 100,
      enemy: 3,
      dealer: false,
      boss: true
    },
  {
      name: "j",
      progress: {
        floor: 2,
        room: 2,
      },
      bool: false,
      inventory: [],
      money: 0,
      hp: 100,
      enemy: 0,
      dealer: false,
      boss: true
    }]
  }]
  private activeUser: User = this.users[0];
  private activeUserI: number = 0
  private statUsers: StatUsers[] = []
  private activeWorld!: World;
  private activeWorldI: number = 0

  // юзеры
  getAllUsers() {
    return this.users
  }

  getActiveUser() {
    return this.activeUser
  }

  newUsers(name: string, pasword: string) {
    this.users.push({
      name: name,
      pasword: pasword,
      weapons: weapons,
      worlds: []
    })

    this.chandgeActiveUser(name, pasword)
  }

  chandgeActiveUser(name: string, pasword: string) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].name == name && this.users[i].pasword == pasword) {
        this.activeUser = this.users[i]
        this.activeUserI = i
        return true
      }
    }
    return false
  }

  // миры 
  newWorld(name: string) {
    this.activeUser.worlds.push({
      name: name,
      progress: {
        floor: 1,
        room: 1,
      },
      bool: true,
      inventory: ['start weapon'],
      money: 0,
      hp: 100,
      enemy: 3,
      dealer: false,
      boss: false
    })
  }

  deleteWorld(name: string) {
    this.activeUser.worlds.forEach(world => {
      for (let i = 0; i < this.activeUser.worlds.length; i++) {
        if (this.activeUser.worlds[i].name == name) {
          this.activeUser.worlds.splice(i, 1)
        }
      }
    })
  }

  getActiveWorld() {
    return this.activeWorld
  }

  changeActiveWorld(name: string) {
    for (let i = 0; i < this.activeUser.worlds.length; i++) {
      if (this.activeUser.worlds[i].name == name) {
        this.activeWorld = this.activeUser.worlds[i]
        this.activeWorldI = i
      }
    }
  }

  newLevel(newfloor: number, newroom: number) {
    this.users[this.activeUserI].worlds[this.activeWorldI].progress = {
      floor: newfloor,
      room: newroom
    }
  }

  saveWorld(newWorld: World) {
    this.users[this.activeUserI].worlds[this.activeWorldI] = newWorld
  }

  // оружие
  addWeapon(weap: string) {
    for(let i = 0; i < weapons.length; i++){
      if(this.activeUser.weapons[i].name == weap){
        this.activeUser.weapons[i].bool = true
      }
    }
  }

  // статистика
  getStatUsers() {
    this.statUsers = []
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].worlds.length != 0) {

        this.users[i].worlds.sort((a, b) => {
          if (a.progress.floor + a.progress.room * 0.1 < b.progress.floor + b.progress.room * 0.1) { return 1 } else
            if (a.progress.floor + a.progress.room * 0.1 > b.progress.floor + b.progress.room * 0.1) { return -1 } else return 0
        })

        this.statUsers.push({
          name: this.users[i].name,
          progress: this.users[i].worlds[0].progress
        })
      }
    }
    return this.statUsers
  }
}
