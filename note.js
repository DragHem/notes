class Note {
  constructor(
    title,
    text,
    id = new Date().getTime(),
    date = new Date().toLocaleDateString(),
  ) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.date = date;
  }

  setTitle(title) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }

  setText(text) {
    this.text = text;
  }

  getText() {
    return this.text;
  }
}
export default Note;
