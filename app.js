import NotesStore from './notesStore.js';
import Note from './note.js';
import Ui from './ui.js';

let notes;
let active;
const store = new NotesStore();
store.getNotesFromLocalStorage();
Ui.displayNotes(store);

const addBtn = document.querySelector('button');
const title = document.querySelector('input[id=title]');
const text = document.querySelector('textarea[id=text]');

notes = document.querySelectorAll('.note');

const removeActive = (items) => {
  items.forEach((item) => item.classList.remove('active'));
};

notes.forEach((note) => {
  note.addEventListener('click', (e) => {
    const { id } = e.target.dataset;

    active = store.getNote(id);
    removeActive(notes);
    e.target.classList.add('active');
  });
});

addBtn.addEventListener('click', () => {
  const note = new Note(title.value, text.value);
  Ui.createNote(store, note);
  store.addNote(note);
  store.addNoteToLocalStorage();
  notes = document.querySelectorAll('.note');
});

title.addEventListener('input', (e) => {
  active.setTitle(e.target.value);
  store.addNoteToLocalStorage();
});

text.addEventListener('input', (e) => {
  active.setText(e.target.value);
  store.addNoteToLocalStorage();
});
