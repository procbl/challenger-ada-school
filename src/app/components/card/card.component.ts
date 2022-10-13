import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Output() update = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() nextStep = new EventEmitter<void>();
  @Output() backStep = new EventEmitter<void>();
  @Input() conteudo: string;
  @Input() lista: string;
  @Input() titulo: string;

  constructor() {}

  ngOnInit() {}
}
