import { Component, OnInit } from '@angular/core';
import { AddEditNotesComponent } from '../add-edit-notes/add-edit-notes.component';
import { MatDialog } from '@angular/material';
import { NotesService } from '../services/notes.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-notes-collection',
  templateUrl: './notes-collection.component.html',
  styleUrls: ['./notes-collection.component.css']
})
export class NotesCollectionComponent implements OnInit {
  pageSize = 2;
  current = 0;
  pagesizeoptions = [5,10,50,100];
  constructor(private notesService:NotesService, public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.notesService.loading = true;    
    this.notesService.getNotes(this.pageSize, this.current);
  }

  addNote() {
    const dialogRef = this.dialog.open(AddEditNotesComponent, { 
      data:{state : "Add", pageSize:this.pageSize, current:this.current}
    });
  }

  editNote(id){
    const dialogRef = this.dialog.open(AddEditNotesComponent, {
      data: { state: "Edit", id: id }
    });
  }

  deleteNote(id){
    this.notesService.loading = true;
    this.notesService.deleteNote(id)
      .subscribe((data:any) => {
        if (data.status === "success") {
          this.snackBar.open(data.message, "close", {
            duration: 3000,
            panelClass: ['green-snackbar']
          });
          this.notesService.getNotes(this.pageSize, this.current);          
        }
      });
  }

  onPageChange(e){
    this.pageSize = e.pageSize;
    this.current = e.pageIndex;
    this.notesService.getNotes(this.pageSize, (this.current*this.pageSize));
  }
}
