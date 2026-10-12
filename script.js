// ---------- Select elements ----------
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const errorMessage = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");
const searchInput = document.querySelector("#search-input");
// ---------- Data ----------
// Each note: { id, text, category, createdAt }
// Save the notes array in the browser as text
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Read the saved text back into an array
function loadNotes() {
  const saved = localStorage.getItem("notes");
  if (saved === null) {
    return [];
  }
  try {
    return JSON.parse(saved);
  } catch (error) {
    return [];
  }
}

let notes = loadNotes();
// ---------- Count message ----------
function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = "You have " + notes.length + " notes.";
  }
}

// ---------- Render ----------// Rebuilds the whole list from the notes array
function render() {
  notesList.textContent = ""; // empties the list

  // Keep only the notes that match the search box (upper/lower case ignored)
  const searchWord = searchInput.value.trim().toLowerCase();
  const visibleNotes = notes.filter(function (note) {
    return note.text.toLowerCase().includes(searchWord);
  });

  if (visibleNotes.length === 0 && searchWord !== "") {
    const message = document.createElement("li");
    message.textContent = "No notes match your search.";
    notesList.append(message);
  }

  for (const note of visibleNotes) {
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

  updateCount();
}

// ---------- Add a note ----------
function handleSubmit(event) {
  event.preventDefault(); // stop the page from reloading

    const text = noteInput.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }
  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  const newNote = {
    id: Date.now(),
    text: text,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString("en-KE"),
  };

  notes.push(newNote);
  saveNotes();
  noteInput.value = "";
  noteInput.focus();
  render();
}

noteForm.addEventListener("submit", handleSubmit);

// ---------- Delete a note ----------
function handleListClick(event) {
  if (!event.target.classList.contains("delete-btn")) {
    return;
  }

  const idToDelete = Number(event.target.dataset.id);
  notes = notes.filter(function (note) {
    return note.id !== idToDelete;
  });
  saveNotes();
  render();
}

notesList.addEventListener("click", handleListClick);

//------------ Search notes ----------
searchInput.addEventListener("input", render);
// ---------- First draw ----------
render();