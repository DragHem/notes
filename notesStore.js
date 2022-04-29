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

  setNotes(notes) {
    this.notesTab = notes;
  }

  showNotes() {
    return this.notesTab;
  }

  addNoteToLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(this.showNotes()));
  }

  getNotesFromLocalStorage() {
    const notes = JSON.parse(localStorage.getItem("notes"));
    if (notes === null) {
      localStorage.setItem("notes", []);
    } else {
      for (const { title, text, id, date } of notes) {
        const notee = new Note(title, text, id, date);
        this.addNote(notee);
      }
    }
  }

  restoreNotes() {
    for (const note of this.showNotes()) {
      this.createNote(note);
    }
  }

  createNote(note) {
    const newNote = document.createElement("div");

    const delBtn = document.createElement("button");
    delBtn.addEventListener("click", (e) => {
      const div = e.target.parentNode;
      const { id } = e.target.parentNode.dataset;
      this.removeNote(id);
      document.body.removeChild(div);
    });
    delBtn.classList.add("delBtn");
    delBtn.textContent = "Usuń";

    newNote.appendChild(delBtn);

    newNote.dataset.id = note.id;
    const noteTitle = document.createElement("h1");
    noteTitle.textContent = note.title;
    newNote.appendChild(noteTitle);
    const noteText = document.createElement("p");
    noteText.textContent = note.text;
    newNote.appendChild(noteText);

    document.body.appendChild(newNote);
  }

  removeNote(id) {
    const filteredNotes = this.notesTab.filter(
      (note) => note.id !== Number(id)
    );
    this.setNotes(filteredNotes);
    this.addNoteToLocalStorage();
  }
}
