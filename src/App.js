import "./styles.css";
import { useState } from "react";
import { Note } from "./Note.js";

export default function App(props) {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("");

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleClick = (event) => {
    console.log("crear nota");
    console.log(newNote);
    const noteToAddToState = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    };
    console.log(noteToAddToState);

    setNotes(notes.concat(noteToAddToState));
    setNewNote("");
  };

  if (typeof notes === "undefined" || notes.length === 0) {
    return "No tenemos notas que mostrar";
  }

  return (
    <div>
      <h1>Notes</h1>
      <ol>
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            content={note.content}
            date={note.date}
          />
        ))}
      </ol>
      <div>
        <input type="text" onChange={handleChange} value={newNote} />
        <button onClick={handleClick}>Crear nota</button>
      </div>
    </div>
  );
}
