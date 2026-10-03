import { Component } from '@angular/core';
import { Mes } from '../../data/interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GeneralButtonPageComponent } from '../general-button-page/general-button-page.component';

@Component({
  selector: 'app-kot-page',
  imports: [CommonModule, RouterLink, GeneralButtonPageComponent],
  templateUrl: './kot-page.component.html',
  styleUrl: './kot-page.component.css'
})
export class KotPageComponent {
  smss: Mes[] = []

  getAnswer(): string {
    let answer: string[] = ["привет", "оригинально", "вау", "мяу-мяу", "мяу!", "мяу", "мррррррррррррррррррррррр", "а есть что поесть?"]
    let i = Math.floor(Math.random() * (answer.length))
    return answer[i]
  }

  newMes(): void {
    let imput: HTMLInputElement | null = document.querySelector(".imp")
    if (imput) {
      this.smss.push({
        mess: imput.value,
        author: "user"
      })
      this.smss.push({
        mess: this.getAnswer(),
        author: 'cat'
      })
    }
  }

  gameRool(): void {
    this.smss.push({
      mess: "расскажи правила игры",
      author: "user"
    })
    this.smss.push({
      mess: `передвижение по клавишам WASD`,
      author: 'cat'
    })
    this.smss.push({
      mess: "атакавать - E",
      author: 'cats'
    })
    this.smss.push({
      mess: "закупать зелья у торговца - Q",
      author: 'cats'
    })
    this.smss.push({
      mess: "ставить игру на паузу - X",
      author: 'cats'
    })
  }

  pr(): void {
    this.smss.push({
      mess: "как связаться с разрабом, у меня жалобы",
      author: "user"
    })
    this.smss.push({
      mess: `инст - lizok_lip`,
      author: 'cat'
    })
    this.smss.push({
      mess: `тг - @lisskur`,
      author: 'cats'
    })
  }

  //функция по выхду из аккаунта
}
