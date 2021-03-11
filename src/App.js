import "./styles.css";
import { useEffect, useState } from "react";
import { Note } from "./Note.js";
import { getAllNotes } from "./services/notes/getAllNotes";
import { createNote } from "./services/notes/createNote";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(false);

  /*  FORMA MAS SENCILLA, MAS RAPIDA, NO ES UNA DEPENDENCIA
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
          setNotes(json);
          setLoading(false);
        });
    }, 2000);
  }, [newNote]);
  */
  useEffect(() => {
    setLoading(true);
    getAllNotes().then((notes) => {
      setNotes(notes);
      setLoading(false);
    });
  }, []);

  /*
  fetch("https://jsonplaceholder.typicode.com/posts") //Peticion asincrona
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
    });
    */

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("crear nota");
    //console.log(newNote);
    const noteToAddToState = {
      //id: notes.length + 1,
      title: newNote,
      body: newNote,
      userId: 1
    };
    //console.log(noteToAddToState);

    createNote(noteToAddToState).then((newNote) => {
      setNotes((prevNotes) => prevNotes.concat(newNote));
    });

    /* axios
      .post("https://jsonplaceholder.typicode.com/posts", noteToAddToState)
      .then((response) => {
        const { data } = response;
        setNotes((prevNotes) => prevNotes.concat(data));
      });*/
    //setNotes(notes.concat(noteToAddToState));
    //setNotes([...notes, noteToAddToState]); //Esta es una forma mucho mas comoda
    setNewNote("");
  };

  console.log("render");
  //if (notes.length === 0) return "Hola MIBOOTCAMP!";

  return (
    <div>
      <h1>Notes</h1>
      {loading ? "Cargando..." : ""}

      <ol>
        {notes.map((note) => (
          <Note key={note.id} {...note} />
        ))}
      </ol>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote} />
        <button>Crear nota</button>
      </form>
    </div>
  );
}
