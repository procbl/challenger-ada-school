import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from 'src/app/models/card.model';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css'],
})
export class AddCardComponent implements OnInit {
  updateCard!: Card;
  action: string = 'add';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddCardComponent>
  ) {
    this.action = data.action.toString();
    if (this.action === 'update') {
      this.updateCard = data.card;
    }
  }
  form!: FormGroup;

  ngOnInit(): void {
    this.createForm(this.action);
  }

  createForm(action: string) {
    this.form = this.formBuilder.group({
      id: action === 'add' ? [null] : this.updateCard.id,
      titulo: action === 'add' ? [null] : this.updateCard.titulo,
      conteudo: action === 'add' ? [null] : this.updateCard.conteudo,
      lista: action === 'add' ? [null] : this.updateCard.lista,
    });
  }
  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
