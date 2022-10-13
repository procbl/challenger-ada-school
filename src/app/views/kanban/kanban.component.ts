import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { CardsService } from 'src/app/services/cards.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddCardComponent } from 'src/app/components/modals/add-card/add-card.component';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css'],
})
export class KanbanComponent implements OnInit {
  cardList: Card[] = [];
  steps = ['ToDo', 'Doing', 'Done'];

  constructor(private service: CardsService, public dialog: MatDialog) {}

  async ngOnInit(): Promise<void> {
    await this.service.getToken().then((resp) => {
      if (resp) {
        this.getCards();
      }
    });
  }

  nextStep(card: Card) {
    console.log('antes', card);
    let currentStep = this.steps.indexOf(card.lista);
    let newStep = currentStep + 1;
    card.lista = this.steps[newStep];
    this.updateCard(card);
  }

  backStep(card: Card) {
    let currentStep = this.steps.indexOf(card.lista);
    let newStep = currentStep - 1;
    card.lista = this.steps[newStep];
    this.updateCard(card);
  }

  addCard(card: Card) {
    this.service.addCard(card).subscribe((resp) => {
      if (resp) {
        this.getCards();
      }
    });
  }

  openDialog(action: string, card?: Card) {
    const dialogRef = this.dialog.open(AddCardComponent, {
      data: {
        action: action,
        card: card,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (action === 'add') {
        this.addCard(result);
      } else {
        this.updateCard(result);
      }
    });
  }

  updateCard(card: Card) {
    this.service.updateCard(card).subscribe((resp) => {
      if (resp) {
        this.getCards();
      }
    });
  }

  deleteCard(id: string) {
    this.service.deleteCard(id).subscribe((resp) => {
      if (resp) {
        this.getCards();
      }
    });
  }

  getCards() {
    this.service.getCards().subscribe((cards) => {
      this.cardList = cards;
    });
  }

  filterCards(tipo: string): Card[] {
    return this.cardList.filter((card) => card.lista === tipo);
  }
}
