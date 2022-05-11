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

  removeNote(id) {
    const filteredNotes = this.notesTab.filter(
      (note) => note.id !== Number(id),
    );
    this.setNotes(filteredNotes);
    this.addNoteToLocalStorage();
  }
}

export default NotesStore;
