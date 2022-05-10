import Note from './note.js';

class NotesStore {
  constructor() {
    this.notesTab = [];
    this.length = this.notesTab.length;
  }

  addNote(note) {
    this.notesTab.push(note);
    this.length += 1;
  }

  getLength() {
    return this.length;
  }

  getNote(id) {
    return this.notesTab.find((note) => note.id === Number(id));
  }

  setNotes(notes) {
    this.notesTab = notes;
  }

  showNotes() {
    return this.notesTab;
  }

  addNoteToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(this.showNotes()));
  }

  getNotesFromLocalStorage() {
    const notes = JSON.parse(localStorage.getItem('notes'));

    if (notes === null) {
      localStorage.setItem('notes', JSON.stringify([]));
    } else {
      for (const {
        title, text, id, date,
      } of notes) {
        const note = new Note(title, text, id, date);
        this.addNote(note);
      }
    }
  }

  // displayNotes() {
  //   for (const note of this.showNotes()) {
  //     this.createNote(note);
  //   }
  // }

  // createNote(note) {
  //   const newNote = document.createElement('div');
  //   newNote.classList.add('note');
  //
  //   newNote.addEventListener('dblclick', (e) => {
  //     const { id } = e.target.dataset;
  //     this.removeNote(id);
  //     document.querySelector('.notes').removeChild(newNote);
  //   });
  //
  //   newNote.dataset.id = note.id;
  //
  //   const noteTitle = document.createElement('h2');
  //   noteTitle.textContent = 'New note title...';
  //   newNote.appendChild(noteTitle);
  //
  //   const noteText = document.createElement('p');
  //   noteText.textContent = 'New note text...';
  //   newNote.appendChild(noteText);
  //
  //   const noteDate = document.createElement('p');
  //   noteDate.classList.add('date');
  //   noteDate.textContent = note.date;
  //   newNote.appendChild(noteDate);
  //
  //   document.querySelector('.notes').appendChild(newNote);
  // }

  removeNote(id) {
    const filteredNotes = this.notesTab.filter(
      (note) => note.id !== Number(id),
    );
    this.setNotes(filteredNotes);
    this.addNoteToLocalStorage();
  }
}

export default NotesStore;
