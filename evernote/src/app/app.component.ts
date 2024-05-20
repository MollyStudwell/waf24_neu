import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NotelistListComponent} from "./notelist-list/notelist-list.component";
import {Notelist} from "./shared/notelist";
import {NoteListComponent} from "./note-list/note-list.component";
import {Note} from "./shared/note";
import {AuthenticationService} from "./shared/authentication.service";

@Component({
  selector: 'bs-root',
  standalone: true,
  imports: [RouterOutlet, NotelistListComponent, NoteListComponent, RouterLinkActive, RouterLink],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'evernote';
  constructor(private authService: AuthenticationService) {
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  getLoginLabel(){
    if(this.isLoggedIn()){
      return "Logout";
    } else {
      return "Login";
    }
  }

}
