import "./App.css";
import { useEffect, useState } from "react";
import { addNote, deleteNote, editNote, getNotes } from "./services/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editingId, setEditingId] = useState(undefined);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === "" || body === "") return;

    const noteToAddOrEditToState = {
      title,
      body,
    };

    if (editingId !== undefined) {
      const resp = await editNote({ id: editingId, title, body });
      if (resp.ok) {
        setNotes((prevNotes) =>
          prevNotes.map((note, idx) => ({
            ...note,
            title: idx === editingId ? title : note.title,
            body: idx === editingId ? body : note.body,
          }))
        );
      }
    } else {
      const resp = await addNote({ title, body });
      if (resp.ok) {
        setNotes([...notes, noteToAddOrEditToState]);
      }
    }

    setTitle("");
    setBody("");
    setEditingId(undefined);
  };

  const handleDeleteNote = async (idx) => {
    const resp = await deleteNote(idx);
    if (resp.ok) {
      setNotes((prevNotes) => prevNotes.filter((_, i) => i !== idx));
    }
  };

  useEffect(() => {
    if (editingId !== undefined) {
      const { title, body } = notes[editingId];
      setTitle(title);
      setBody(body);
    }
  }, [editingId, notes]);

  useEffect(() => {
    getNotes().then(({ ok, data }) => {
      if (ok) {
        console.log(data);
        setNotes(data);
      }
    });
  }, []);

  return (
    <div>
      <h1 className="site-heading">Mis notas de estudio</h1>
      <section className="app-section">
        <div className="notes-add">
          <h1>Crear nota</h1>
          <form className="notes-form" onSubmit={handleSubmit}>
            <label htmlFor="title">Titulo de la nota:</label>
            <input
              id="title"
              type="text"
              placeholder="Ingrese el titulo de su nota aqui"
              value={title}
              required
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <label htmlFor="body">Cuerpo de la nota:</label>
            <textarea
              placeholder="Ingrese el contenido de su nota aqui"
              value={body}
              required
              onChange={(e) => {
                setBody(e.target.value);
              }}
            />
            <button className="notes-form-button">
              {editingId !== undefined ? "Guardar nota" : "Crear nota"}
            </button>
          </form>
        </div>
        <div className="notes-list">
          <h1 className="notes-list__heading">Notas</h1>
          <ul className="notes-wrapper">
            {notes.length === 0 ? (
              <h1 className="message">
                No tienes notas, crea una para visualizarla aqui
              </h1>
            ) : null}
            {notes.map((note, idx) => (
              <li key={idx} className="note-item" role="button">
                <h2>{note.title}</h2>
                <p>{note.body}</p>
                <div className="actions">
                  <button
                    className="edit"
                    onClick={() => {
                      setEditingId(idx);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDeleteNote(idx)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default App;
