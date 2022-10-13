import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  baseURL: string = 'http://localhost:5000';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getToken(): Observable<string | null> {
    return this.http.post<any>(`${this.baseURL}/login/`, {
      login: 'letscode',
      senha: 'lets@123',
    });
  }

  addCard(token: string, card: Card): Observable<any> {
    const body = JSON.stringify({
      titulo: card.titulo,
      conteudo: card.conteudo,
      lista: 'ToDo',
    });
    return this.http.post<any>(`${this.baseURL}/cards/`, body, {
      headers: this.getHeaders(token),
    });
  }

  updateCard(token: string, card: Card): Observable<any> {
    const body = JSON.stringify({
      id: card.id,
      titulo: card.titulo,
      conteudo: card.conteudo,
      lista: card.lista,
    });
    return this.http.put<any>(`${this.baseURL}/cards/${card.id}`, body, {
      headers: this.getHeaders(token),
    });
  }

  deleteCard(token: string, id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/cards/${id}`, {
      headers: this.getHeaders(token),
    });
  }

  getCards(token: string): Observable<Card[]> {
    return this.http.get<any>(`${this.baseURL}/cards/`, {
      headers: this.getHeaders(token),
    });
  }

  getHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }
}
