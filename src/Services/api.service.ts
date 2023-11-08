import { Categoria } from './../model/categoria';
import { Observable } from 'rxjs';
import { Usuario } from './../model/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

const apiUrl = 'https://localhost:7015/api/categorias';
const apiLoginUrl = 'https://localhost:7015/api/autoriza/login';
let token;
let httpOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  montaHeaderToken() {
    token = localStorage.getItem('jwt');
    console.log('jwt header token ' + token);
    httpOption = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      }),
    };
  }

  login(Usuario: NgForm): Observable<Usuario> {
    return this.http.post<Usuario>(apiLoginUrl, Usuario);
  }

  getCategorias(): Observable<Categoria[]> {
    this.montaHeaderToken();
    console.log(httpOption.headers);
    return this.http.get<Categoria[]>(apiUrl, httpOption);
  }

  getCategoria(id: string): Observable<Categoria> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Categoria>(url, httpOption);
  }

  adicionaCategoria(Categoria: NgForm): Observable<Categoria> {
    this.montaHeaderToken();
    return this.http.post<Categoria>(apiUrl, Categoria, httpOption);
  }

  updateCategoria(id: string, Categoria: NgForm): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, Categoria, httpOption);
  }

  deleteCategoria(id: string): Observable<Categoria> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Categoria>(url, httpOption);
  }
}
