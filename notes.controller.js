const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await saveNotes(notes);
  console.log(chalk.bgGreen("Note was added!"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });

  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.bgBlue("Here is the list of notes:"));
  notes.forEach((note) => {
    console.log(chalk.blue(note.id, note.title));
  });
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function updateNotes(id, title) {
  const notes = await getNotes();

  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex !== -1) {
    notes[noteIndex].title = title;
    await saveNotes(notes);
    console.log(chalk.bgBlue(`Note was update`));
  }
}

async function removeNotes(id) {
  const notes = await getNotes();

  const filterNotes = notes.filter((note) => note.id !== id);

  await saveNotes(filterNotes);
  console.log(chalk.bgRed("Delete note id"));
}

module.exports = {
  addNote,
  printNotes,
  removeNotes,
  getNotes,
  updateNotes,
};
