import "./styles.css";
import { useState } from "react";
import { Note } from "./Note.js";

export default function App(props) {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("crear nota");
    console.log(newNote);
    const noteToAddToState = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    };
    console.log(noteToAddToState);

    //setNotes(notes.concat(noteToAddToState));
    setNotes([...notes, noteToAddToState]); //Esta es una forma mucho mas comoda
    setNewNote("");
  };

  const handleShowAll = () => {
    setShowAll(() => !showAll);
  };

  if (typeof notes === "undefined" || notes.length === 0) {
    return "No tenemos notas que mostrar";
  }

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={handleShowAll}>
        {showAll ? "Show only important" : "Show All"}
      </button>
      <ol>
        {notes
          .filter((note) => {
            if (showAll === true) return note;
            return note.important === true;
          })
          .map((note) => (
            <Note
              key={note.id}
              id={note.id}
              content={note.content}
              date={note.date}
            />
          ))}
      </ol>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote} />
        <button>Crear nota</button>
      </form>
    </div>
  );
}
