class Ui {
  static activeNote;

  static activeNoteDiv = {};

  static notes = [];

  static displayNotes(store) {
    for (const note of store.showNotes()) {
      Ui.createNote(store, note);
    }
  }

  static createNote(store, note, click = false) {
    const newNote = document.createElement('div');
    newNote.classList.add('note');

    newNote.dataset.id = note.id;

    const noteTitle = document.createElement('h2');
    noteTitle.textContent = note.getTitle() === '' ? 'New note title...' : note.getTitle();
    newNote.appendChild(noteTitle);

    const noteText = document.createElement('p');
    noteText.textContent = note.getText() === '' ? 'New note text...' : note.getText();
    newNote.appendChild(noteText);

    const noteDate = document.createElement('p');
    noteDate.classList.add('date');
    noteDate.textContent = note.date;
    newNote.appendChild(noteDate);

    newNote.addEventListener('dblclick', (e) => {
      this.clearInputs();
      const { id } = e.target.dataset;
      store.removeNote(id);
      document.querySelector('.notes').removeChild(newNote);

      const notes = document.querySelectorAll('.note');
      if (notes) this.notes = [...notes];
      if (this.notes.length === 0) {
        document.querySelector('input[id=title]').style.display = 'none';
        document.querySelector('textarea[id=text]').style.display = 'none';
      }
    });

    newNote.addEventListener('click', (e) => {
      const { id } = e.target.dataset;
      this.activeNote = store.getNote(id);
      this.activeNoteDiv.title = noteTitle;
      this.activeNoteDiv.text = noteText;
      Ui.removeActive(this.notes);
      e.target.classList.add('active');
    });

    document.querySelector('.notes').appendChild(newNote);
    this.notes.push(newNote);
    if (click) newNote.click();
  }

  static removeActive(items) {
    items.forEach((item) => item.classList.remove('active'));
  }

  static getActiveNote() {
    return this.activeNote;
  }

  static getActiveNoteDiv() {
    return this.activeNoteDiv;
  }

  static clearInputs() {
    document.querySelector('input[id=title]').value = '';
    document.querySelector('textarea[id=text]').value = '';
  }
}

export default Ui;
