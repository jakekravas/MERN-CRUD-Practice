import React, { useContext } from 'react';
import NoteContext from "../../context/notes/noteContext";

const Notes = () => {
  const noteContext = useContext(NoteContext);
  const { notes } = noteContext;
  console.log(notes);
  return (
    <div id="notes-container">
      {notes.map(note => (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{note.title}</h4>
          <p className="card-text">{note.content}</p>
          <button className="btn btn-dark mr-1">Edit</button>
          <button className="btn btn-danger">Delete</button>
        </div>
      </div>
      ))}
    </div>
  )
}

export default Notes;