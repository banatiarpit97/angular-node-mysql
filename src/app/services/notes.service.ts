import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  total;
  notes = [];
  apiUrl = "http://localhost:3000/api/notes/";
  loading = true;
  constructor(private http: HttpClient) {

  }

  getCurrentDate() {
    const date = new Date();
    const dateToPost = `${date.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2 })}/${date.getMonth() + 1}/${date.getFullYear()}
    ${date.getHours().toLocaleString('en-US',{minimumIntegerDigits:2})}:${date.getMinutes().toLocaleString('en-US',{minimumIntegerDigits:2})}`;
    const details = {
      user_id: 1,
      date_time: dateToPost
    };
    return details;
  }

  addNote(note){  
    const details = this.getCurrentDate();
    const postData = new FormData();
    postData.append('title', note.value.title);
    postData.append('noteValue', note.value.noteValue);
    postData.append('image', note.value.image, note.value.title);
    postData.append('user_id', details.user_id.toString());
    postData.append('date_time', details.date_time);
    return this.http.post(this.apiUrl, postData);
  }

  editNote(note, id, editImage){
    let details;
    if(note.value.date_time){
      details = this.getCurrentDate();
    }
    else{
      this.notes.forEach((elem, ind) => {
        if (elem.id === id) {
          details = {
            user_id:1,
            date_time:elem.date_time
          };
        }
      });
    }
    const editData = new FormData();
    editData.append('title', note.value.title);
    editData.append('noteValue', note.value.noteValue);
    editData.append('image', note.value.image, note.value.title);
    editData.append('date_time', details.date_time);
    return this.http.patch(this.apiUrl + id, editData );
  }

  deleteNote(id){
    return this.http.delete(this.apiUrl + id);
  }

  getNotes(pageSize, offset){
    const query = `?pageSize=${pageSize}&offset=${offset}`;
    this.http.get(this.apiUrl+query)
      .subscribe((data:any) => {
        this.loading = false;
        this.notes = data.body;
        this.total = data.count.MAX;
      });
  }


}
