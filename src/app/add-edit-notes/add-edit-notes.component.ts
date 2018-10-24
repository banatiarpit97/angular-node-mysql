import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotesService } from '../services/notes.service';
@Component({
  selector: 'app-add-edit-notes',
  templateUrl: './add-edit-notes.component.html',
  styleUrls: ['./add-edit-notes.component.css']
})
export class AddEditNotesComponent implements OnInit {
  state;
  note: FormGroup;
  noteImage:any = "../../assets/images/placeholder3-840x630.png";
  editImage = false;
  imageUrl = "http://localhost:3000/images/";
  constructor(public dialogRef: MatDialogRef<AddEditNotesComponent>,
    private FormBuilder: FormBuilder, public notesService:NotesService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.note = this.FormBuilder.group({
        title : [null, Validators.required],
        noteValue: [null, Validators.required],
        image: [null],
        date_time: [true],
      });
      this.state = data.state;
      if(this.state === "Edit"){
        const note = this.notesService.notes.find((elem, index) => {
          if(elem.id === this.data.id){
            return true;
          }
        });
        this.note.patchValue({title:note.title, noteValue:note.value, image:note.image});
        this.noteImage =  this.imageUrl+note.image;
      }
    }

  ngOnInit() {
  }

  addNote(note){
    this.notesService.addNote(note)
      .subscribe((data: any) => {
        this.notesService.loading = false;
        if (data.message === 'success') { 
          this.notesService.getNotes(this.data.pageSize, this.data.pageSize*this.data.current);
        }
        this.dialogRef.close();
      });
  }

  editNote(note, id, editImage){
    this.notesService.editNote(note, id, editImage)
      .subscribe((data: any) => {
        this.notesService.loading = false;
        if (data.message === 'success') { 
          this.notesService.notes.forEach((elem) => {
            if(elem.id === id){
              elem.title = data.body.title;
              elem.value = data.body.value;
              if(editImage){
                elem.image = data.body.image;
              }
              else{
                elem.image = this.note.value.image;
              }
              elem.date_time = data.body.date_time;

            }
          });
        }
        this.dialogRef.close();
      });
  }

  saveNote() {
    this.notesService.loading = true;
    if (this.state === 'Add') {
      this.addNote(this.note);
    } else if (this.state === 'Edit') {
      this.editNote(this.note, this.data.id, this.editImage);
    }
  }

  imgUpload(e:Event){
    this.editImage = true;
    const file = (e.target as HTMLInputElement).files[0];
    this.note.patchValue({image:file});
    this.note.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.noteImage = reader.result;
    };
    reader.readAsDataURL(file);
  }

}
