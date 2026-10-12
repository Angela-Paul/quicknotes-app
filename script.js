// ---------- Select elements ----------
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

// ---------- Data ----------
// Each note: { id, text, category, createdAt }
let notes = [];

// ---------- Render ----------
// Rebuilds the whole list from the notes array
function render() {
  notesList.textContent = ""; // empties the list

  for (const note of notes) {
    const card = document.createElement("li");
    card.classList.add("note-card", "category-" + note.category);

    const text = document.createElement("p");
    text.classList.add("note-text");
    text.textContent = note.text;

    const meta = document.createElement("p");

    const category = document.createElement("span");
    category.classList.add("note-category");
    category.textContent = note.category;

    const date = document.createElement("span");
    date.classList.add("note-date");
    date.textContent = note.createdAt;

    meta.append(category, date);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.dataset.id = note.id;
    deleteBtn.textContent = "Delete";

    card.append(text, meta, deleteBtn);
    notesList.append(card);
  }
}

// ---------- Add a note ----------
function handleSubmit(event) {
  event.preventDefault(); // stop the page from reloading

  const text = noteInput.value.trim();
  if (text === "") {
    return;
  }

  const newNote = {
    id: Date.now(),
    text: text,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString("en-KE"),
  };

  notes.push(newNote);
  noteInput.value = "";
  noteInput.focus();
  render();
}

noteForm.addEventListener("submit", handleSubmit);

// ---------- First draw ----------
render();