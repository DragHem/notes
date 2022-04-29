const store = new NotesStore();
store.getNotesFromLocalStorage();
store.restoreNotes();

const addBtn = document.querySelector("button");
const title = document.querySelector("input[id=title]");
const text = document.querySelector("input[id=text]");

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const note = new Note(title.value, text.value);
  store.createNote(note);
  store.addNote(note);
  store.addNoteToLocalStorage();

  title.value = "";
  text.value = "";
});
