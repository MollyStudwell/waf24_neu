import {Component, OnInit} from '@angular/core';
import {Notelist} from "../shared/notelist";
import {EvernoteService} from "../shared/evernote.service";
import {TodoList} from "../shared/todo-list";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {TodoFactory} from "../shared/todo-factory";
import {NotelistFactory} from "../shared/notelist-factory";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Note} from "../shared/note";

@Component({
  selector: 'bs-todo-list',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './todo-list.component.html',
  styles: ``
})
export class TodolistListComponent implements OnInit{
  todos: TodoList[] = [];

  constructor( private service: EvernoteService,
               private toastr:ToastrService) {
  }
  ngOnInit(): void {
    this.service.getAllTodos().subscribe(res=>this.todos = res);
  }

  removeTodoInList(id: number){
    if(id) {
      if(confirm("Todo wirklich löschen?")) {
        this.service.removeTodoInList(id).subscribe(
          () => {
            this.ngOnInit();
            this.toastr.success('Todo gelöscht!', "Evernote");
          }
        );
      }
    }
  }
}
