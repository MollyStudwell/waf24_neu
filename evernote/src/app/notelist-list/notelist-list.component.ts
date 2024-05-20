import {Component, OnInit} from '@angular/core';
import {Notelist} from "../shared/notelist";
import {NoteListComponent} from "../note-list/note-list.component";
import {EvernoteService} from "../shared/evernote.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'bs-notelist-list',
  standalone: true,
  imports: [
    NoteListComponent,
    RouterLink
  ],
  templateUrl: './notelist-list.component.html',
  styles: ``
})
export class NotelistListComponent implements OnInit{
  notelists: Notelist[] = [];

  constructor(private evernoteService: EvernoteService) {
  }
  ngOnInit(): void {
    this.evernoteService.getAll().subscribe(res => this.notelists = res);
  }

}
