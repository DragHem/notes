class Ui {
  static displayNotes(store) {
    for (const note of store.showNotes()) {
      Ui.createNote(store, note);
    }
  }

  static createNote(store, {
    id, title, text, date,
  }) {
    const newNote = document.createElement('div');
    newNote.classList.add('note');

    newNote.addEventListener('dblclick', (e) => {
      const { id } = e.target.dataset;
      store.removeNote(id);
      document.querySelector('.notes').removeChild(newNote);
    });

    newNote.dataset.id = id;

    const noteTitle = document.createElement('h2');
    noteTitle.textContent = title === '' ? 'New note title...' : title;
    newNote.appendChild(noteTitle);

    const noteText = document.createElement('p');
    noteText.textContent = text === '' ? 'New note text...' : text;
    newNote.appendChild(noteText);

    const noteDate = document.createElement('p');
    noteDate.classList.add('date');
    noteDate.textContent = date;
    newNote.appendChild(noteDate);

    document.querySelector('.notes').appendChild(newNote);
  }
}

export default Ui;
