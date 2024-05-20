import {Component, OnInit} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {NotelistFactory} from "../shared/notelist-factory";
import {EvernoteService} from "../shared/evernote.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NoteFactory} from "../shared/note-factory";
import {Note} from "../shared/note";
import {NotelistFormErrorMessages} from "../notelist-form/notelist-form-error-messages";
import {NoteFormErrorMessages} from "./note-form-error-messages";
import {CategoryFactory} from "../shared/category-factory";

@Component({
  selector: 'bs-note-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './note-form.component.html',
  styles: ``
})
export class NoteFormComponent implements OnInit{
  noteForm : FormGroup;
  note= NoteFactory.empty();
  isUpdatingNote = false;
  errors:{[key:string]:string} = {};
  noteId: number|undefined;
  notelist_id: number|undefined;
  categoryForm: FormGroup;
  images: FormArray;
  categories: FormArray;

  constructor(
    private fb: FormBuilder,
    private everservice: EvernoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.noteForm = this.fb.group({});
    this.images = this.fb.array([]);
    this.categories = this.fb.array([]);
    this.categoryForm = this.fb.group({});
    const navigation = router.getCurrentNavigation();
    console.log(navigation?.extras.state);
    if(navigation && navigation.extras.state){
      this.notelist_id = navigation?.extras.state['notelist'];
    }
  }

  ngOnInit() {
    const Id = this.route.snapshot.params['id'];
    console.log(this.route.snapshot.params);
    if(Id){
      this.noteId=Id;
    }
    if(Id){ // wir fügen eine Notiz hinzu
      this.isUpdatingNote = true;
      this.everservice.getSingleNote(Id).subscribe(note =>{
        this.note = note;
        this.initNote();
      });
    }
    this.initNote();
  }

  initNote(){
    this.buildThumbnailsArray();
    this.buildCategoriesArray();
    this.noteForm = this.fb.group({
      id: [this.note.id],
      title: [this.note.title, Validators.required],
      description: [this.note.description],
      notelist_id: [this.note.notelist_id, Validators.required],
      categories: this.categories,
      images: this.images
    });

    this.noteForm.statusChanges.subscribe(()=>this.updateErrorMessages());

  }

  buildThumbnailsArray() {
    if (this.note.images) {
      this.images = this.fb.array([]);

      for (let img of this.note.images) {
        let fg = this.fb.group({
          id: new FormControl(img.id),
          url: new FormControl(img.url, [Validators.required]),
          title: new FormControl(img.title, [Validators.required])
        });
        this.images.push(fg);
      }
      if (this.note.images.length == 0)
        this.addThumbnailControl();
    }
  }

  buildCategoriesArray() {
    if (this.note.categories) {
      this.categories = this.fb.array([]);

      for (let cat of this.note.categories) {
        let fg = this.fb.group({
          id: new FormControl(cat.id),
          category: new FormControl(cat.category),
        });
        this.categories.push(fg);
      }
      if (this.note.categories.length == 0)
        this.addCategoryControl();
    }
  }

  addThumbnailControl() {
    this.images.push(this.fb.group({ id: 0, url: null, title:null}));
  }

  addCategoryControl() {
    this.categories.push(this.fb.group({ id: 0, category: null}));
  }

  submitNoteForm(){
    this.noteForm.value.images = this.noteForm.value.images.filter(
      (thumbnail: {url:string}) => thumbnail.url
  );

    const note : Note = NoteFactory.fromObject(this.noteForm.value);
    console.log(note);
    if(this.isUpdatingNote){
      this.everservice.updateNote(note).subscribe(()=> {
        this.router.navigate([`../../notelists/${note.notelist_id}`],{relativeTo:this.route});
      });
    }else{
      if(this.notelist_id){
        note.notelist_id = this.notelist_id;
      }
      console.log(note);
      this.everservice.createNote(note).subscribe(()=>{
        this.note = NoteFactory.empty();
        this.noteForm.reset(NoteFactory.empty());
        this.router.navigate([`../notelists/${note.notelist_id}`],{relativeTo:this.route});
      });
    }
  }

  private updateErrorMessages() {
    this.errors = {};
    for(const message of NoteFormErrorMessages){
      const control = this.noteForm.get(message.forControl)
      if(control && control.dirty && control.invalid &&
        control.errors && control.errors[message.forValidator] &&
        !this.errors[message.forControl]){
        this.errors[message.forControl] = message.text;
      }
    }
  }

  createCategory(category?:any){
    return this.fb.group({
      category:[category, Validators.required]
      }
    )
  }

  addCategory() {

  }

  /*submitCategoryForm() {
    this.everservice.createCategory(category).subscribe(()=>{
      this.category = CategoryFactory.empty();
      this.categoryForm.reset(CategoryFactory.empty());
      this.router.navigate([`../notelists/${note.notelist_id}`],{relativeTo:this.route});
    });
  }*/
}

