import { Injectable } from '@angular/core';
import {Notelist} from "./notelist";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Note} from "./note";
import {TodoList} from "./todo-list";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class EvernoteService {
  private api = 'http://evernote.s2110456034.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Array<Notelist>>(`${this.api}/notelists`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error)
  }

  getSingleNote(id: string): Observable<Note> {
    return this.http.get<Note>(`${this.api}/notes/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingleNotelist(id: string): Observable<Notelist> {
    return this.http.get<Notelist>(`${this.api}/notelists/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getAllTodos() {
    return this.http.get<Array<TodoList>>(`${this.api}/todos`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getAllUsers(){
    return this.http.get<Array<User>>(`${this.api}/users`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }


  removeNotelist(id:number):Observable<any>{
    return this.http.delete<Notelist>(`${this.api}/notelists/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  removeNote(id:number):Observable<any> {
    return this.http.delete<Note>(`${this.api}/notes/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  createNotelist(notelist:Notelist):Observable<any> {
    return this.http.post<Notelist>(`${this.api}/notelists`, notelist)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  createNote(note:Note):Observable<any> {
    return this.http.post<Note>(`${this.api}/notes`, note)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }
  createTodo(todo:TodoList):Observable<any> {
    return this.http.post<TodoList>(`${this.api}/todos`, todo)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  updateNotelist(notelist:Notelist):Observable<any> {
    return this.http.put<Notelist>(`${this.api}/notelists/${notelist.id}`, notelist)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }
  updateNote(note:Note):Observable<any> {
    return this.http.put<Note>(`${this.api}/notes/${note.id}`, note)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingleTodo(id: string): Observable<TodoList> {
    return this.http.get<TodoList>(`${this.api}/todos/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getEmail(searchTerm: string): Observable<Array<User>> {
    return this.http.get<User>(`${this.api}/user/search/${searchTerm}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

}
