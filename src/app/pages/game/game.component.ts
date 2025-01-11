import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  imports: [NgIf],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {
  private result: boolean = false;
  private resultMessage: string = '';
  private computerPicked: boolean = false;
  private userPicked: boolean = false;
  private userScore = 0;
  private labelNumberUser: number = 0;
  private labelNumberComputer: number = 0;
  private showButton: boolean = false;
  private messages = new Map<number, string>([
    [1, 'computer wins'],
    [2, 'you win'],
    [3, 'draw'],
  ]);
  private playingItems = new Map<string, number>([
    ['rock', 1],
    ['paper', 2],
    ['scissor', 3],
  ]);
  /**
   * This is critical to understand. the key is the additon of the numbers representing rock(1), paper(2), scissor(3)
   * so 3 = rock (1) + paper (2). If the addition is 3 - winner is rock(2). So the pair [3,2]
   * likewise
   * 4 = rock(1) + scissor(3). The addition is 4, the winner is rock (1). So the pair [4,1]
   * likewise
   * 5 = paper(2) + scissor(3). The addtion is 5, and the winner is paper (2)
   */
  private winningCombinations = new Map<number, number>([
    [3, 2],
    [4, 1],
    [5, 2],
  ]);

  handleSelection(theLabelNumberUser: number) {
    this.resultMessage = '';
    this.labelNumberUser = theLabelNumberUser;
    this.userPicked = true;
    this.showButton = false;
    this.result = false;
    setTimeout(() => {
      this.labelNumberComputer = this.getRandomInt(1, 3);
      this.computerPicked = true;
    }, 1000);
    if (true) {
      setTimeout(() => {
        this.resultMessage = this.findWinner(
          this.getLabelNumberUser(),
          this.getLabelNumberComputer()
        );
        this.result = true;
        this.showButton = true;
      }, 2000);
    }
  }
  handlePlayAgain() {
    this.result = false;
    this.resultMessage = '';
    this.computerPicked = false;
    this.userPicked = false;
    this.userScore = 0;
    this.labelNumberUser = 0;
    this.labelNumberComputer = 0;
    this.showButton = false;
  }
  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  //return 'computer' or 'you' - the only one who is the winner
  findWinner(userItem: number, computerItem: number): string | any {
    const addition = userItem + computerItem;
    const winningItem = this.winningCombinations.get(addition);
    if (userItem === computerItem) {
      return this.messages.get(3);
    } else if (winningItem === userItem) {
      this.userScore++;
      return this.messages.get(2);
    } else if (winningItem === computerItem) {
      this.userScore--;
      return this.messages.get(1);
    } else {
      return '';
    }
  }

  getScore(): number {
    return this.userScore;
  }

  getLabelNumberUser(): number {
    return this.labelNumberUser;
  }

  getLabelNumberComputer(): number {
    return this.labelNumberComputer;
  }

  getComputerPicked(): boolean {
    return this.computerPicked;
  }
  getUserPicked(): boolean {
    return this.userPicked;
  }
  getResult(): boolean {
    return this.result;
  }
  getResultMessage(): string {
    return this.resultMessage;
  }
  getShowButton(): boolean {
    return this.showButton;
  }
}
