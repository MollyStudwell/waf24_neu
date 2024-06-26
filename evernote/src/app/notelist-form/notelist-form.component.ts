import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NotelistFactory} from "../shared/notelist-factory";
import {EvernoteService} from "../shared/evernote.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TodoList} from "../shared/todo-list";
import {User} from "../shared/user";
import {NgForOf} from "@angular/common";
import {ErrorMessage, NotelistFormErrorMessages} from "./notelist-form-error-messages";
import {Notelist} from "../shared/notelist";
import {Note} from "../shared/note";
import {NoteFactory} from "../shared/note-factory";
import {ShareToUserComponent} from "../share-to-user/share-to-user.component";

@Component({
  selector: 'bs-notelist-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    ShareToUserComponent
  ],
  templateUrl: './notelist-form.component.html',
  styles: ``
})
export class NotelistFormComponent implements OnInit{
  notelistForm: FormGroup;
  notelist = NotelistFactory.empty();
  isUpdatingNotelist = false;
  errors:{[key:string]:string} = {};
  notelistId: number = 0;
  keyup = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    private service: EvernoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.notelistForm = this.fb.group({});
  }

  ngOnInit() {
    this.keyup.subscribe((value=> console.log(value)))
    const Id = this.route.snapshot.params['id'];
    this.notelistId=Id;
    console.log(Id);
    if(Id) {
      this.isUpdatingNotelist = true;
      this.service.getSingleNotelist(Id).subscribe(nl => {
        this.notelist = nl;
        this.initNoteList();
      });
    }
    this.initNoteList();
  }

  initNoteList() {
    console.log('notelist-form', this.notelist)
    this.notelistForm = this.fb.group({
      id: [this.notelist.id],
      name: [this.notelist.name, Validators.required],
      visibility: [this.notelist.visibility, Validators.required],
      creator_id: [this.isUpdatingNotelist ? this.notelist.creator_id :
        sessionStorage.getItem('userId'), Validators.required],
      user: this.fb.array([]),
      notes: this.fb.array([])
      //-------------------------------------------------

    });

    this.notelistForm.statusChanges.subscribe(()=>this.updateErrorMessages());

    if (this.notelist.user && this.notelist.user.length > 0) {
      this.addUserFromDB(this.notelist.user);
    }
  }

  get user(): FormArray {
    return this.notelistForm.get('user') as FormArray;
  }

  addUserFromDB(user:any[]): void {
    this.user.push(this.createUserForm());
    const userArray = this.notelistForm.get('user') as FormArray;
    user.forEach(user => {
      userArray.push(this.fb.group({
        firstname: [user.firstname, Validators.required],
        lastname: [user.lastname, Validators.required],
        email: [user.email, Validators.required],
      }));
    });
  }

  addUser() {
    this.user.push(this.createUserForm());
  }

  createUserForm(user?: any): FormGroup {
    console.log(user);
    return this.fb.group({
      firstname: [user ? user.firstname : '', Validators.required],
      lastname: [user ? user.lastname : '', Validators.required],
      email: [user ? user.email : '', Validators.required],
    });
  }

    deleteUser(index: number): void {
    const userGroup = this.user.at(index) as FormGroup;
    this.user.removeAt(index);
  }


  submitNotelistForm() {
    const notelist : Notelist = NotelistFactory.fromObject(this.notelistForm.value);
    console.log(notelist);
    if(this.isUpdatingNotelist){
      this.service.updateNotelist(notelist).subscribe(() => {
        this.router.navigate([`../../notelists`],{relativeTo:this.route});
      });
    } else{
      this.service.createNotelist(notelist).subscribe(()=>{
        this.notelist = NotelistFactory.empty();
        this.notelistForm.reset(NotelistFactory.empty());
        this.router.navigate(['../notelists'],{relativeTo:this.route});
      });
    }
  }
  private updateErrorMessages() {
    this.errors = {};
    for(const message of NotelistFormErrorMessages){
      const control = this.notelistForm.get(message.forControl)
      if(control && control.dirty && control.invalid &&
        control.errors && control.errors[message.forValidator] &&
        !this.errors[message.forControl]){
        this.errors[message.forControl] = message.text;
      }
    }
  }


  selected(user: User) {
    console.log('selecteduser',user);

  }
  
}


