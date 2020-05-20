import React, { useEffect, useContext } from 'react';
import NoteContext from "../../context/notes/noteContext";
import AuthContext from "../../context/auth/authContext";
import NoteItem from "./NoteItem";

const Notes = props => {
  const noteContext = useContext(NoteContext);
  const { notes, getNotes } = noteContext;

  useEffect(() => {
    getNotes();
  }, []);

  if (notes === null){
    return <h5>Loading...</h5>
  } else if (notes.length === 0){
    return <h5>No notes to display</h5>
  }

  return (
    <div id="notes-container">
      {notes.map(note => (
        <NoteItem key={note._id} note={note}/>
      ))}
    </div>
  )
}

export default Notes;