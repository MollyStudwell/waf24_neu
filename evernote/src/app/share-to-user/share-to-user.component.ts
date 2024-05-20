import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounce, debounceTime, distinctUntilChanged, switchMap} from "rxjs";
import {User} from "../shared/user";
import {EvernoteService} from "../shared/evernote.service";
import {tap} from "rxjs/operators";
import {NgClass} from "@angular/common";

@Component({
  selector: 'bs-share-to-user',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './share-to-user.component.html',
  styles: ``
})
export class ShareToUserComponent implements OnInit{
  keyup = new EventEmitter<string>();
  foundUser: User[] = [];
  isLoading = false;
  @Output() selected = new EventEmitter<User>();

  constructor(private service:EvernoteService) {
  }

  ngOnInit(){
    this.keyup.pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .pipe(tap(()=>this.isLoading = true))
      .pipe(switchMap(searchTerm=>this.service.getEmail(searchTerm)))
      .pipe(tap(()=>this.isLoading = false))
      .subscribe(user=>this.foundUser = user);
      }
}
