import NotesStore from './notesStore.js';
import Note from './note.js';
import Ui from './ui.js';

const store = new NotesStore();
store.getNotesFromLocalStorage();
Ui.displayNotes(store);

const addBtn = document.querySelector('button');
const title = document.querySelector('input[id=title]');
const text = document.querySelector('textarea[id=text]');
const notes = document.querySelectorAll('.notes');

notes.forEach((note) => {
  note.addEventListener('click', () => {
    title.style.display = 'block';
    text.style.display = 'block';

    const activeNote = Ui.getActiveNote();

    title.value = activeNote.getTitle();
    text.value = activeNote.getText();
  });
});

addBtn.addEventListener('click', () => {
  title.value = '';
  text.value = '';
  const note = new Note(title.value, text.value);
  Ui.createNote(store, note);
  store.addNote(note);
  store.addNoteToLocalStorage();
});

title.addEventListener('input', (e) => {
  const activeNote = Ui.getActiveNote();
  if (activeNote !== undefined) Ui.activeNote.setTitle(e.target.value);
  store.addNoteToLocalStorage();

  const noteDiv = Ui.getActiveNoteDiv();
  if (noteDiv.title) noteDiv.title.textContent = e.target.value;
});

text.addEventListener('input', (e) => {
  const activeNote = Ui.getActiveNote();
  if (activeNote !== undefined) Ui.activeNote.setText(e.target.value);
  store.addNoteToLocalStorage();

  const noteDiv = Ui.getActiveNoteDiv();
  if (noteDiv.text) noteDiv.text.textContent = e.target.value;
});
