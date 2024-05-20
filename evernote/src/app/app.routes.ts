import { Routes } from '@angular/router';
import {NotelistListComponent} from "./notelist-list/notelist-list.component";
import {NoteListComponent} from "./note-list/note-list.component";
import {TodolistListComponent} from "./todo-list/todo-list.component";
import {NotelistFormComponent} from "./notelist-form/notelist-form.component";
import {LoginComponent} from "./login/login.component";
import {NoteFormComponent} from "./note-form/note-form.component";
import {TodoFormComponent} from "./todo-form/todo-form.component";

export const routes: Routes = [
  {path:'',redirectTo:'notelists',pathMatch:'full'},
  {path:'notelists',component: NotelistListComponent},
  {path:'notelists/:id',component: NoteListComponent},
  {path:'todos',component: TodolistListComponent},
  {path:'form-notelist',component: NotelistFormComponent},
  {path:'form-notelist/:id',component: NotelistFormComponent},
  {path:'form-note',component: NoteFormComponent},
  {path:'form-note/:id',component: NoteFormComponent},
  {path:'form-todo',component: TodoFormComponent},
  {path:'form-todo/:id',component: TodoFormComponent},
  {path: 'login', component: LoginComponent}
];
